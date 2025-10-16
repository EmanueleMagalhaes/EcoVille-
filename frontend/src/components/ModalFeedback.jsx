import React, { useState } from "react";
import "./modalfeedback.css";

function ModalFeedback({ solicitacao, onClose, onFeedbackEnviado }) {
  const [feedback, setFeedback] = useState(solicitacao.feedback || "");

  async function enviarFeedback() {
    if (!feedback.trim()) {
      alert("Por favor, escreva um feedback antes de enviar.");
      return;
    }

    const token = localStorage.getItem("token");
    const url = `http://localhost:8080/api/coletas/${solicitacao.id}/feedback`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        alert("Feedback enviado com sucesso!");
        onFeedbackEnviado(); // Atualiza a lista de solicitações no pai
        onClose(); // Fecha o modal
      } else {
        const erro = await response.text();
        alert("Erro ao enviar feedback: " + erro);
      }
    } catch (e) {
      console.error("Erro no envio do feedback:", e);
      alert("Erro ao enviar feedback.");
    }
  }

  return (
    <div className="modal">
      <div className="modal-conteudo">
        <h3>Feedback da Solicitação #{solicitacao.id}</h3>
        <p>Deixe seu comentário sobre esta coleta:</p>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Digite seu feedback aqui..."
          rows="5"
          style={{ width: "100%", resize: "none", marginTop: "10px" }}
        ></textarea>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={enviarFeedback}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalFeedback;
