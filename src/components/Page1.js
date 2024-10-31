import React from 'react';
import '../assets/css/page1.css'; 
import logo from '../assets/images/icon.jpg';

const Page1 = () => {
  return (
    <div className="login-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Sanofi" />
      <form id="loginForm">
        <input type="text" id="email" placeholder="E-mail" required />
        <input type="password" id="password" placeholder="Senha" required />
        <div className="login-options">
          <a href="./page3">Esqueci a senha</a>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <div className="login-options">
        <p className="signup-prompt">Ainda não possui conta? <a href="./page2">Faça seu cadastro.</a></p>
      </div>
      <div className="button-container">
        <a href="./page7" className="action-button">Confirmar presença online!</a>
      </div>
    </div>
  );
};

export default Page1;
