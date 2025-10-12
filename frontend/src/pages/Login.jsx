import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import MenuSuperior from "../components/MenuSuperior";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeUsuario: "",
    senha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   
    
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Conta não encontrada.");
        return;
      }

      const data = await response.json();

      console.log("Dados recebidos no login:", data);

      // Salvar token no localStorage
      localStorage.setItem("token", data.token);

      // Verificar perfil e redirecionar
      const perfil = typeof data.perfil === "string" ? data.perfil : data.perfil?.name;
      if (perfil === "RESIDENCIAL") {
        navigate("/solicitacoes");
      } else if (perfil === "COLETOR") {
        navigate("/solicitacoes-coletor");
      } else {
        setError("Perfil de usuário não reconhecido.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Conta não encontrada.");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
       
        <input
          type="text"
          id="nomeUsuario"
          name="nomeUsuario"
          placeholder="Digite seu usuário"
          value={formData.nomeUsuario}
          onChange={handleChange}
          required
        />

        
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-logar">Logar</button>
      </form>

      <p className="criar-conta-texto">
        Ainda não tem conta?{" "}
        <span className="link-criar-conta" onClick={() => navigate("/criar-conta")}>
          Criar conta
        </span>
      </p>
    </div>
    </div>
  );
}

export default Login;
<MenuSuperior />