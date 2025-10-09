import React, { useState } from "react";
import "./CriarConta.css";

function CriarConta() {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    logradouro: "",
    estado: "",
    cidade: "",
    bairro: "",
    numero: "",
    complemento: "",
    latitude: "",
    longitude: "",
    confirmarLocalizacao: false,
  });

  const [mapUrl, setMapUrl] = useState("");

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔍 Busca o endereço via CEP
  const buscarCep = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, ""); // remove caracteres não numéricos
    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      // Preenche automaticamente os campos
      setFormData((prev) => ({
        ...prev,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  // Atualiza mapa com base em latitude e longitude
  const atualizarMapa = () => {
    if (formData.latitude && formData.longitude) {
      const url = `https://maps.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15&output=embed`;
      setMapUrl(url);
    }
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Conta criada com sucesso!");
  };

  return (
    <div className="criar-conta-container">
      <h2>Criar conta EcoVille</h2>

      <form onSubmit={handleSubmit}>
        {/* Dados da conta */}
        <h3>Dados da conta</h3>
        <input
          type="text"
          placeholder="Nome de usuário"
          name="nomeUsuario"
          value={formData.nomeUsuario}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />

        {/* Endereço */}
        <h3 className="end">Endereço</h3>

        <input
          type="text"
          placeholder="CEP"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={buscarCep}
          required
        />

        <input
          type="text"
          placeholder="Logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          required
        />

        {/* 🔒 BLOQUEADOS: estado, cidade, bairro */}
        <input
          type="text"
          placeholder="Estado"
          name="estado"
          value={formData.estado}
          disabled
        />

        <input
          type="text"
          placeholder="Cidade"
          name="cidade"
          value={formData.cidade}
          disabled
        />

        <input
          type="text"
          placeholder="Bairro"
          name="bairro"
          value={formData.bairro}
          disabled
        />

        <input
          type="text"
          placeholder="Número"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Complemento"
          name="complemento"
          value={formData.complemento}
          onChange={handleChange}
        />

        {/* GeoLocalização */}
        <h3>GeoLocalização</h3>

        <input
          type="text"
          placeholder="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          onBlur={atualizarMapa}
          required
        />

        <input
          type="text"
          placeholder="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          onBlur={atualizarMapa}
          required
        />

        {mapUrl && (
          <iframe
            src={mapUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="confirmarLocalizacao"
            checked={formData.confirmarLocalizacao}
            onChange={handleChange}
          />
          <label>Confirmo que essa é a localização informada</label>
        </div>

        <div className="botoes">
          <button type="button" onClick={() => alert("Cancelado!")}>
            Cancelar
          </button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CriarConta;
