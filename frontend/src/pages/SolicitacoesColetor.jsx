import React, { useState } from "react";
import "./SolicitacoesColetor.css";

function SolicitacoesColetor() {
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");


  const solicitacoes = [
    { id: "#154545", status: "AGUARDANDO", materiais: ["12 kg de plástico", "1 kg de metal"], data: "05/10/2025" },
    { id: "#1545345", status: "COLETADO", materiais: ["12 kg de plástico", "1 kg de metal"], data: "05/10/2025" },
    { id: "#1545345", status: "FINALIZADO", materiais: ["12 kg de plástico", "1 kg de metal"], data: "05/10/2025" },
    { id: "#1545345", status: "CANCELADO", materiais: ["12 kg de plástico", "1 kg de metal"], data: "05/10/2025" },
  ];

  const filtrarSolicitacoes = solicitacoes.filter((item) => {
    const filtroPorData = !filtroData || item.data === filtroData;
    const filtroPorStatus = filtroStatus === "TODOS" || item.status === filtroStatus;
    return filtroPorData && filtroPorStatus;
  });

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

      <h2>Bem-vindos, Coletor Henrique Douglas</h2>

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
        {filtrarSolicitacoes.map((sol) => (
          <div key={sol.id} className="card-solicitacao">
            <div className={`status-tag ${sol.status.toLowerCase()}`}>{sol.status}</div>
            <h4>{sol.id}</h4>
            <ul>
              {sol.materiais.map((mat, index) => (
                <li key={index}>🗑 {mat}</li>
              ))}
            </ul>
            <p className="data">Data: {sol.data}</p>

            {handleAcao(sol.status) && (
              <button className="btn-acao">{handleAcao(sol.status)}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolicitacoesColetor;
