import React, { useState } from "react";
import "./ModalValidar.css";

function ModalValidar({ solicitacao, onClose, onValidadorSucesso }) {
  const [materiais, setMateriais] = useState(
    solicitacao.itensColeta.map((item) => ({
      id: item.id,
      tipo: item.tipo,
      quantEstimada: item.quantEstimada,
      quantReal: item.quantReal || item.quantEstimada || "",
      estado: item.estado || "",
    }))
  );

  function atualizarMaterial(id, campo, valor) {
    setMateriais((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
    );
  }

  async function confirmarValidacao() {
    for (let mat of materiais) {
      if (!mat.quantReal || mat.quantReal <= 0 || !mat.estado) {
        alert("Preencha a quantidade e estado de todos os materiais!");
        return;
      }
    }

    const token = localStorage.getItem("token");
    const url = "http://localhost:8080/api/coletas/avaliar";

    const payload = materiais.map((m) => ({
      id: m.id,
      tipo: m.tipo,
      quantEstimada: parseFloat(m.quantEstimada),
      quantReal: parseFloat(m.quantReal),
      estado: m.estado,
    }));

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Materiais validados com sucesso!");
        await onValidadorSucesso(); // atualiza dados do backend
        onClose(); // fecha modal
      } else {
        const erro = await response.text();
        alert("Erro ao validar materiais: " + erro);
      }
    } catch (e) {
      console.error("Erro na validação:", e);
      alert("Erro ao validar materiais.");
    }
  }

  return (
    <div className="modal">
      <div className="modal-conteudo">
        <h3>Validar Solicitação #{solicitacao.id}</h3>
        <p>Preencha os dados dos materiais coletados:</p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {materiais.map((item) => (
            <li key={item.id} style={{ marginBottom: "12px" }}>
              <strong>{item.tipo}</strong>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={item.quantReal}
                  onChange={(e) =>
                    atualizarMaterial(item.id, "quantReal", e.target.value)
                  }
                  placeholder="Quantidade real (kg)"
                />
                <select
                  value={item.estado}
                  onChange={(e) =>
                    atualizarMaterial(item.id, "estado", e.target.value)
                  }
                >
                  <option value="">Estado</option>
                  <option value="RUIM">Ruim</option>
                  <option value="BOM">Bom</option>
                  <option value="OTIMO">Ótimo</option>
                </select>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={confirmarValidacao}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalValidar;
