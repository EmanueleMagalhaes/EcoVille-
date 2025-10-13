import React, { useEffect, useState } from "react";
import "./SolicitacoesColetor.css";

function SolicitacoesColetor() {
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [usuario, setUsuario] = useState({});

  useEffect(()=>{

    disponiveis();

let usuario = JSON.parse(localStorage.getItem("usuario"));

    setUsuario(usuario);

  }, [])

  async function disponiveis(){

    let url = "http://localhost:8080/api/coletas/disponiveis";

    let token = localStorage.getItem("token");

    let solicitacoes = await requisicao(url, "get", null, token);
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    setSolicitacoes(solicitacoes);
    setUsuario(usuario);


  }

  const handleAcao = (status) => {
    if (status === "AGUARDANDO") return "Coletar";
    if (status === "COLETADO") return "Validar";
    return null;
  };

  return (
    <div className="solicitacoes-container">
      <div className="menu-superior">
        <a href="#">Solicitações</a>
        <a href="#" className="sair">Sair</a>
      </div>

      <h2>Bem-vindo, {usuario.nomeUsuario}</h2>

      <div className="filtros">
        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="TODOS">Status</option>
          <option value="AGUARDANDO">AGUARDANDO</option>
          <option value="COLETADO">COLETADO</option>
          <option value="FINALIZADO">FINALIZADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>

<div className="cards-container">
  {(solicitacoes.length && solicitacoes.map((sol) => (
    
    <div key={sol.id} className="card-solicitacao">

      <div className={`status-tag ${sol.status.toLowerCase()}`}>{sol.status}</div>
      <h4>{`#${sol.id}`}</h4>

            {itens(sol.itensColeta)}
            
        <p className="data">Data solicitada: {sol.dataSolicitacao}</p>
        <p className="data">Data agendada: {sol.dataAgendada}</p>
        <p className="feedback">Feedback: {sol.feedback || <i>nenhum comentário</i>}</p>

      {handleAcao(sol.status) && (
              <button className="btn-acao">{handleAcao(sol.status)}</button>
            )}
    </div>
  ))) || <p className="mensagem-vazia">Nenhuma solicitação disponível.</p>}
</div>
    </div>
  );
}

export default SolicitacoesColetor;


async function requisicao(url, method, body, autorizacao){

  method = method.toUpperCase();

  let envio = {
        method: method,
        body: JSON.stringify(body),
        headers: {
        "Content-Type" : "application/json", 
        "Authorization" : autorizacao
      }
    }

    if(method === "GET"){
       envio = {
        method: method.toUpperCase(),
        headers: {
        "Content-Type" : "application/json", 
        "Authorization" : autorizacao
      }
    }
    }


  try {
  const response = await fetch(url, envio);

  if (!response.ok) {

    if(response.status == 401){
      alert("voce não tem autorização pra fazer isso");
    }
    throw new Error(`${response.status}, ${response.statusText}`);
  }

  let json = await response.json();
  console.log(json);
  return json;

} catch (error) {
  console.error('Erro na requisição:', error);
}

return null;
}


function itens(lista){
  return (
          <ul>
            {lista.map((item) => (
                <li key={item.id}>

                  <div>
                    {item.tipo}
                  </div>
                  <div>
                    {item.quantEstimada}
                  </div>
                  <div>
                    {item.quantReal}
                  </div>
                  <div>
                    {item.estado}
                  </div>

                  </li>
              ))}
            </ul>
  );
}