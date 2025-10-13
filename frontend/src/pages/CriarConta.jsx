import React, { useState, useEffect } from "react";
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

useEffect(() => {
  const atualizarMapa =  (lat, lon) => {

  if (lat && lon) {
        const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
        setMapUrl(url);
      }
    };

  const buscarCep = async () => {
    if (formData.cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const data = await response.json();

      console.log("Resposta da API ViaCEP:", data);

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      }));

    const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, Brasil`;
    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`);
    const geoData = await geoResponse.json();

    if (geoData && geoData.length > 0) {
      const { lat, lon } = geoData[0];
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lon,
      }));
      atualizarMapa(lat, lon);
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  }
};

if (/^\d{8}$/.test(formData.cep)) {
    buscarCep();
  }
}, [formData.cep]);

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};

const atualizarMapa = (lat= formData.latitude, lon= formData.longitude) => {
  if (lat && lon) {
    const url = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    setMapUrl(url);
  }
};

const handleSubmit = async (e) => {

  e.preventDefault();

    if (formData.senha.length < 10) {
      alert("A senha deve ter no mínimo 10 caracteres.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }


    const usuario = {
      nomeUsuario: formData.nomeUsuario,
      senha: formData.senha,
      perfil: "RESIDENCIAL",
      endereco: {
        cep: formData.cep,
        logradouro: formData.logradouro,
        estado: formData.estado,
        cidade: formData.cidade,
        bairro: formData.bairro,
        numero: formData.numero,
        complemento: formData.complemento,
        latitude: formData.latitude,
        longitude: formData.longitude,
      },
    };

  try {
    const response = await fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    if (response.ok) {
      alert("Conta criada com sucesso!");
      // Redirecionar ou limpar formulário
      window.location.href = "/";
      return;
    }

  const text = await response.text();
  let errorMessage = "Erro ao criar conta.";

  if (text) {
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.message || errorMessage;
    } catch {
      console.warn("Resposta não era JSON:", text);
    }
  }

  alert(errorMessage);

  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    alert("Erro ao enviar dados.");
  }
};

return (
  <div className="criar-conta-container">
    <h2>Criar conta EcoVille</h2>

    <form onSubmit={handleSubmit}>
      {/* Dados da conta */}

      <div className="userAddress">
      <section className="criacaoConta">
        <h3>Dados da conta</h3>
        <div className="userDatas">
          <div  className="nomeUser">
            <input type="text" placeholder="Nome de usuário" name="nomeUsuario" value={formData.nomeUsuario} onChange={handleChange} required />
          </div>

          <div className="senhas">
            <input type="password" placeholder="Senha" name="senha" value={formData.senha} onChange={handleChange} required />

            <input type="password" placeholder="Confirmar senha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />
          </div>
        </div>
      </section>
      
      {/* Endereço */}
      <section className="endereco">
        <h3 className="end">Endereço</h3>

        <div className="cepBairro">
          <input type="text" placeholder="CEP" name="cep" value={formData.cep} onChange={handleChange} required />

          <input type="text" placeholder="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} readOnly/>

        </div>


        <div className="estadoLogradouro">
          <input type="text" placeholder="Estado" name="estado" value={formData.estado} onChange={handleChange} readOnly/>
          <input type="text" placeholder="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} readOnly />
        </div>

        <div  className="numeroComplementoCity">
          <input type="text" placeholder="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} readOnly/>

          <input type="text" placeholder="Número" name="numero" value={formData.numero} onChange={handleChange} required />

          <input type="text" placeholder="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
        </div>
      </section>
      </div>

      {/* GeoLocalização */}
      <section className="geolocalizacao">
        <div className="geolocalizacao-container">
          <div className="inputs-geolocalizacao">
            <h4>GeoLocalização</h4>
            <input type="text" placeholder="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} onBlur={atualizarMapa} required readOnly/>

            <input type="text" placeholder="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} onBlur={atualizarMapa} required readOnly/>

            <div className="checkbox-group">
              <div className="inputCheck">
                <input type="checkbox" name="confirmarLocalizacao" checked={formData.confirmarLocalizacao} onChange={handleChange} />
              </div>
              <div className="labelCheck">
                <label>Confirmo que essa é a localização informada</label>
              </div>
            </div>

          </div>

          <div className="mapa">
            {mapUrl && (
                <div className="map-container">
                  <iframe
                      src={mapUrl}
                      width="100%"
                      height="400"
                      style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                      allowFullScreen
                      loading="lazy"
                      title="Mapa de localização"
                  ></iframe>
                </div>
            )}
          </div>

        </div>
        </section>

        <div className="botoes">
          <button type="button" onClick={() => alert("Cancelado!")}>Cancelar</button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
  </div>
);
}

export default CriarConta;
