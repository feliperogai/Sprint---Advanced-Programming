import React, { useState } from 'react';
import '../assets/css/page3.css';
import logo from '../assets/images/icon.jpg';

const Page3 = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    if (!email) {
      setMessage('Por favor, insira seu e-mail.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);

    fetch('/reset-password', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.mensagem);
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao enviar a solicitação.');
        console.error('Erro:', error);
      });
  };

  return (
    <div className="container">
      <center>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Sanofi" height="120px" />
      </center>
      <div className="reset-password-form">
        <h2>Esqueceu a Senha?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Insira seu e-mail para recuperar a senha:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit">Enviar</button>
        </form>
        <div id="response-message" style={{ color: message.includes('enviadas por e-mail') ? 'green' : 'red' }}>
          {message}
        </div>
        <a href="./">Voltar ao Login</a>
      </div>
    </div>
  );
};

export default Page3;
