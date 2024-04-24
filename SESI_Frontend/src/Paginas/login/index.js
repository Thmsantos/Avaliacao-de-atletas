import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/atleta.png";
import Sesi from "../../assets/logo2.jpg";
import "./style.css";
import Axios from "axios";
import { Button } from "react-bootstrap"; 
import { toast } from 'react-toastify'

function Login() {
  const [emailAccount, setEmail] = useState("");
  const [pswd, setPassword] = useState("");

  function handleLogin() {
    Axios.post("http://4.228.66.252:24/login", {
      email: emailAccount,
      senha: pswd,
    }).then((response) => {
      if (response.data.msg === "SUCESSO") {
        response.data.cargo = response.data.cargo.toLowerCase()
        let cargo = response.data.cargo.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log(cargo)
        window.location.href = `${cargo}/${emailAccount}`;
      } else toast.error('Usuário ou senhas incorretos!');
    });
  }

  return (
    <div className="container-login">
      <div className="img-box">
        <img src={login} alt="teste" />
      </div>
      <div className="content-box">
        <div className="form-box">
          <div className="segundo">
            <h3>BEM-VINDO AO</h3>
          </div>
          <div className="titulo-segundario">
            <h2>PORTAL ESPORTE</h2>
          </div>
          <img src={Sesi} className="logo" />

          <form>
            <div className="input-box">
              <span>Digite o email:</span>
              <input
                type="email"
                className="input-login"
                placeholder="Informe seu E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mb-3"></div>
            </div>

            <div className="input-box">
              <span>Digite a senha:</span>
              <input
                className="border-2"
                type="password"
                placeholder="Informe sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-box">
              <Button onClick={handleLogin} className="btnEntrar">
                Entrar
              </Button>
            </div>
            <div className="remember">
              <Link to="/Redefinir">Esqueceu a Senha?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;