import React, { useEffect, useState } from "react";
import "./SolicitacoesColetor.css";

function SolicitacoesColetor() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarSolicitacoes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/coletas/todos");
        if (!response.ok) throw new Error("Erro ao buscar solicitações");
        const data = await response.json();
        setSolicitacoes(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };
    carregarSolicitacoes();
  }, []);

  const formatarData = (data) => {
    if (!data) return "Não informada";
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
  };

  const calcularDiferencaDias = (data) => {
    if (!data) return "";
    const hoje = new Date();
    const alvo = new Date(data);
    const diff = Math.floor((alvo - hoje) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `Daqui ${diff} dias`;
    if (diff < 0) return `Há ${Math.abs(diff)} dias`;
    return "Hoje";
  };

  const getCorStatus = (status) => {
    switch (status) {
      case "AGUARDANDO": return "#e6b800"; 
      case "COLETADO": return "#007bff"; 
      case "FINALIZADO": return "#28a745"; 
      case "CANCELADO": return "#dc3545"; 
      default: return "#999";
    }
  };

  if (loading) return <p>Carregando solicitações...</p>;
  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;

  return (
    <div className="solicitacoes-container">
      <h2>Solicitações de Coleta</h2>

      {solicitacoes.length === 0 ? (
        <p>Nenhuma solicitação encontrada.</p>
      ) : (
        <div className="cards-container">
          {solicitacoes.map((s) => (
            <div
              key={s.id}
              className="card-solicitacao"
              style={{
                borderLeft: `6px solid ${getCorStatus(s.status_coleta)}`,
              }}
            >
              <h3>#{s.id} - {s.status_coleta}</h3>

              <div className="info-bloco">
                <strong>Materiais:</strong>
                <ul>
                  {s.quantidade_plastico > 0 && (
                    <li>Plástico: {s.quantidade_plastico} kg ({s.situacao_plastico})</li>
                  )}
                  {s.quantidade_papel > 0 && (
                    <li>Papel: {s.quantidade_papel} kg ({s.situacao_papel})</li>
                  )}
                  {s.quantidade_vidro > 0 && (
                    <li>Vidro: {s.quantidade_vidro} kg ({s.situacao_vidro})</li>
                  )}
                  {s.quantidade_metal > 0 && (
                    <li>Metal: {s.quantidade_metal} kg ({s.situacao_metal})</li>
                  )}
                  {s.quantidade_eletronico > 0 && (
                    <li>Eletrônicos: {s.quantidade_eletronico} kg ({s.situacao_eletronico})</li>
                  )}
                </ul>
              </div>

              <div className="datas">
                <p><strong>Data Agendada:</strong> {formatarData(s.data_agendada)}</p>
                {s.data_coletada && (
                  <p><strong>Data Coletada:</strong> {formatarData(s.data_coletada)}</p>
                )}
                <p className="diferenca">{calcularDiferencaDias(s.data_agendada)}</p>
              </div>

              <div className="acoes">
                {s.status_coleta === "AGUARDANDO" && (
                  <button className="btn-primario">Confirmar Coleta</button>
                )}
                {s.status_coleta === "COLETADO" && (
                  <button className="btn-secundario">Finalizar</button>
                )}
                {s.status_coleta === "FINALIZADO" && (
                  <button className="btn-visualizar">Ver Feedback</button>
                )}
                {s.status_coleta === "CANCELADO" && (
                  <span className="cancelado">Cancelado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SolicitacoesColetor;