import React, { useEffect, useRef, useState } from "react";
import MenuSuperior from "../components/MenuSuperior";
import "./SolicitacoesColetor.css";
import { useNavigate } from "react-router-dom";

function SolicitacoesColetor() {

  const select = useRef("TODOS");
  const calendario = useRef("");

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [usuario, setUsuario] = useState({});

  async function rendporStatus(){

    let lista =[];

    for(let i=0;i<solicitacoes.length;i++){
      if(solicitacoes[i].status == select.current.value){
        lista.push(solicitacoes[i]);
      }
    }
    setFiltrados(lista);

    if(select.current.value == "TODOS"){
      setFiltrados(solicitacoes);
    }

  }

  function rendPorData(){

    let data = calendario.current.value;

    let lista = [];

    for(let i=0;i<solicitacoes.length;i++){

      let dataAgdd = traduzData(solicitacoes[i].dataAgendada);

      data = traduzData(data);

      if(data == dataAgdd){
        lista.push(solicitacoes[i]);
      }
    }

    setFiltrados(lista);
  }


  async function todos(){
  let url = "http://localhost:8080/api/coletas/todos";
  let token = localStorage.getItem("token");
  let response = await requisicao(url, "get", null, token);

  return response;
}



  useEffect(()=>{

    let data = new Date();

    let hoje = formatData(data);

    calendario.current.value = hoje;

    disponiveis();

  let usuario = JSON.parse(localStorage.getItem("usuario"));

    setUsuario(usuario);

  }, [])

  async function disponiveis(){

    let solicitacoes = await todos();
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    setSolicitacoes(solicitacoes);
    setFiltrados(solicitacoes);
    setUsuario(usuario);
  }

  async function aceitar(solicitacaoId){
    
    let token = localStorage.getItem("token");


    let request = await reqAceitar(solicitacaoId, usuario.id, token);

    if(request){
      disponiveis();
    }

  }

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
          <option value="COLETADO">COLETADO</option>
          <option value="FINALIZADO">FINALIZADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>

      <div className="cards-container">
        {(filtrados.length && filtrados.map((sol) => (
          
          <div key={sol.id} className="card-solicitacao">

            <div className={`status-tag ${sol.status.toLowerCase()}`}>{sol.status}</div>
            <h4>{`#${sol.id}`}</h4>

                  {itens(sol.itensColeta)}
                  
              <p className="data">Data solicitada: {sol.dataSolicitacao}</p>
              <p className="data">Data agendada: {sol.dataAgendada}</p>
              <p className="feedback">Feedback: {sol.feedback || <i>nenhum comentário</i>}</p>
            <button onClick={()=>aceitar(sol.id, sol.usuarioResidencial.id)}>aceitar</button>
          </div>
        ))) || <p className="mensagem-vazia">Nenhuma solicitação disponível.</p>}
      </div>
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

    if(response.status == 401 || response.status == 403){
      setTimeout(() => {
        alert("voce não tem autorização pra fazer isso");
        localStorage.clear();
        window.location.href = "/";
      }, 500);
    }
    throw new Error(`${response.status}, ${response.statusText}`);
  }

  let json = await response.json();

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

async function reqAceitar(solicitacaoId, usuarioId, autorizacao){

  let url = `http://localhost:8080/api/coletas/${solicitacaoId}/aceitar?coletorId=${usuarioId}`;


  let envio = {
        method: "PATCH",
        headers: {
        "Content-Type" : "application/json", 
        "Authorization" : autorizacao
      }
    }

  try {
  const response = await fetch(url, envio);

  if (!response.ok) {
    if(response.status == 401 || response.status == 403){
      alert("voce não tem autorização pra fazer isso");
    }
    throw new Error(`${response.status}, ${response.statusText}`);
  }

  let json = await response.json();
  return json;

} catch (error) {
  console.error('Erro na requisição:', error);
}

return null;

}

function formatData(date) {
  return date.toISOString().split('T')[0];
}

function traduzData(data){

  data = data.split("T")[0];

  data = data.split("-");

  let dia = data[2];
  let mes = data[1];
  let ano = data[0];

  return `${dia}-${mes}-${ano}`;
}