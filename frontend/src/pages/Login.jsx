import "./Login.css";
import { useNavigate } from "react-router-dom";
import MenuSuperior from "../components/MenuSuperior";
import { useRef } from "react";

function Login() {

  const navigate = useNavigate();

  const nomeUsuario = useRef();
  const senha = useRef();

  function body(){
    return {
      nomeUsuario: nomeUsuario.current.value,
      senha: senha.current.value
    }
  }



  async function handleSubmit(e){
    e.preventDefault();

    let data = await requisicao(body());

    let passe = verificacao(data);

    if(!passe){return}

       // Salvar token no localStorage
      localStorage.setItem("token", `${data.type} ${data.token}`);

      //Salvar usuario na maquina
      localStorage.setItem("usuario", JSON.stringify(data));

      // Verificar perfil e redirecionar
      const perfil = data.usuario.perfil;

      if (perfil === "RESIDENCIAL") {
        navigate("/solicitacoes");

      } else if (perfil === "COLETOR") {
        navigate("/solicitacoes-coletor");
      }
    

  }


  function verificacao(data){

      if(data === 401){
        senha.current.setCustomValidity("senha incorreta");
        senha.current.reportValidity();
        return null;
      }
      if(data === 404){
        nomeUsuario.current.setCustomValidity("não encontrado");
        nomeUsuario.current.reportValidity()
        return null;
      }

      return true;
  }



  return (
    <div className="login-container">
      <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
       
        <input type="text" id="nomeUsuario"  name="nomeUsuario"
        placeholder="Digite seu usuário" ref={nomeUsuario} 
        onInput={limpaSet} required  />

        
        <input
          type="password" id="senha" name="senha" placeholder="Digite sua senha"
          ref={senha} onInput={limpaSet} required />


        <div className="button-container">
          <button type="submit" className="btn-logar">Logar</button>
        </div>
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

function limpaSet(e){
  e.target.setCustomValidity("");
}


async function requisicao(body){
  let url = "http://localhost:8080/api/login";


  let envio = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
        "Content-Type" : "application/json"
      }
    }


  try {
  const response = await fetch(url, envio);

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return 401;

      case 404:
        return 404;

      default:
        throw new Error(`${response.status}, ${response.statusText}`);
    }
  }

  const data = await response.json();
  console.log(data);
  return data;

} catch (error) {
  console.error('Erro na requisição:', error);
  throw error;
}

}