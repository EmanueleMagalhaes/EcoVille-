import React, { useEffect, useRef, useState } from "react";
import MenuSuperior from "../components/MenuSuperior";
import "./SolicitacoesColetor.css";
import ModalValidar from "../components/ModalValidar";

function SolicitacoesColetor() {
  const select = useRef("TODOS");
  const calendario = useRef("");

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

  // filtros
  async function rendporStatus() {
    let lista = solicitacoes.filter(
      (s) => s.status === select.current.value
    );
    setFiltrados(lista);

    if (select.current.value === "TODOS") {
      disponiveis();
    }

    if (select.current.value === "ACEITA") {
      aceitas();
    }

    if (select.current.value === "COLETADA") {
      coletadas();
    }
  }

  function rendPorData() {
    let data = traduzData(calendario.current.value);
    let lista = solicitacoes.filter(
      (s) => traduzData(s.dataAgendada) === data
    );
    setFiltrados(lista);
  }

  // requisições
  async function todos() {
    let url = "http://localhost:8080/api/coletas/todos";
    let token = localStorage.getItem("token");
    let response = await requisicao(url, "get", null, token);
    return response;
  }

  function aceitas() {
    let list = solicitacoes.filter(
      (s) => s.coletor && s.coletor.id === usuario.id && s.status === "ACEITA"
    );
    setFiltrados(list);
  }

  function coletadas() {
    let list = solicitacoes.filter(
      (s) => s.coletor && s.coletor.id === usuario.id && s.status === "COLETADA"
    );
    setFiltrados(list);
  }

  async function validarComSucesso() {
    await disponiveis();
    select.current.value = "COLETADA";
    coletadas();
  }



  useEffect(() => {
    let hoje = formatData(new Date());
    calendario.current.value = hoje;
    disponiveis();

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuario);
  }, []);

  async function disponiveis() {
    let solicitacoes = await todos();
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    setSolicitacoes(solicitacoes);
    setFiltrados(solicitacoes);
    setUsuario(usuario);
  }

  // ações

  async function aceitar(solicitacaoId) {
    const token = localStorage.getItem("token");
    const request = await reqAceitar(solicitacaoId, usuario.id, token);

    if (request) {
      alert("Solicitação aceita com sucesso!");

      const novasSolicitacoes = solicitacoes.map((s) =>
        s.id === solicitacaoId ? { ...s, status: "ACEITA" } : s
      );

      setSolicitacoes(novasSolicitacoes);
      setFiltrados(novasSolicitacoes);

      const usuarioAtualizado = {
        ...usuario,
        solicitacoes: novasSolicitacoes,
      };
      setUsuario(usuarioAtualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
    }
  }

  function abrirModal(solicitacao) {
    setSolicitacaoSelecionada(solicitacao);
    setOpenModal(true);
  }

  function fecharModal() {
    setOpenModal(false);
    setSolicitacaoSelecionada(null);
  }

  // UI render

  return (
    <div>
      <MenuSuperior />
      <div className="solicitacoes-container">
        <h2>Bem-vindo, {usuario.nomeUsuario}</h2>

        <div className="filtros">
          <input type="date" ref={calendario} onInput={rendPorData} />
          <select ref={select} onClick={rendporStatus}>
            <option value="TODOS">TODOS</option>
            <option value="AGUARDANDO">AGUARDANDO</option>
            <option value="ACEITA">ACEITAS</option>
            <option value="COLETADA">COLETADA</option>
          </select>
        </div>

        <div className="cards-container">
          {(filtrados.length &&
            filtrados.map((sol) => (
              <div key={sol.id} className="card-solicitacao">
                <div className={`status-tag ${sol.status.toLowerCase()}`}></div>
                <h4>{`#${sol.id}`}</h4> {sol.status}

                {itens(sol.itensColeta)}

                <p className="data">Data solicitada: {sol.dataSolicitacao}</p>
                <p className="data">Data agendada: {sol.dataAgendada}</p>
                <p className="feedback">
                  Feedback: {sol.feedback || <i>nenhum comentário</i>}
                </p>

                {sol.status === "AGUARDANDO" && (
                  <button onClick={() => aceitar(sol.id)}>Aceitar</button>
                )}
                {sol.status === "ACEITA" && (
                  <button onClick={() => abrirModal(sol)}>Validar</button>
                )}
              </div>
            ))) || (
            <p className="mensagem-vazia">Nenhuma solicitação disponível.</p>
          )}
        </div>

        {openModal && solicitacaoSelecionada && (
          <ModalValidar
            solicitacao={solicitacaoSelecionada}
            onClose={fecharModal}
            onValidadorSucesso={validarComSucesso}
          />
        )}

      </div>
    </div>
  );
}

export default SolicitacoesColetor;


async function requisicao(url, method, body, autorizacao) {
  method = method.toUpperCase();
  let envio = {
    method,
    headers: { "Content-Type": "application/json", Authorization: autorizacao },
  };
  if (body && method !== "GET") envio.body = JSON.stringify(body);

  try {
    const response = await fetch(url, envio);
    if (!response.ok) throw new Error(`${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
  return null;
}

function itens(lista) {
  return (
    <ul className="itens">
      {lista.map((item) => (
        <li key={item.id}>
          <div>tipo: {item.tipo.toLowerCase()}</div>
          <div>Quantidade real: {item.quantReal}</div>
          <div>estado: {item.estado}</div>
        </li>
      ))}
    </ul>
  );
}

async function reqAceitar(solicitacaoId, usuarioId, autorizacao) {
  const url = `http://localhost:8080/api/coletas/${solicitacaoId}/aceitar?coletorId=${usuarioId}`;
  const envio = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: autorizacao,
    },
  };
  try {
    const response = await fetch(url, envio);
    if (!response.ok) throw new Error(`${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao aceitar:", error);
  }
  return null;
}

function formatData(date) {
  return date.toISOString().split("T")[0];
}

function traduzData(data) {
  data = data.split("T")[0];
  const [ano, mes, dia] = data.split("-");
  return `${dia}-${mes}-${ano}`;
}
