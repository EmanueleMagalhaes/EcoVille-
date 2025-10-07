import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import MenuSuperior from "../components/MenuSuperior";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

   
    if (formData.usuario === "residencial" && formData.senha === "123") {
      navigate("/home"); 
    } else if (formData.usuario === "funcionario" && formData.senha === "123") {
      navigate("/solicitacoes"); 
    } else {
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
          id="usuario"
          name="usuario"
          placeholder="Digite seu usuário"
          value={formData.usuario}
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