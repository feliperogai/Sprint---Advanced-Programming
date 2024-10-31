import React, { useState } from 'react';
import '../assets/css/page4.css';
import logo from '../assets/images/icon.jpg';

const Page4 = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Validação simples
    if (newPassword.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const formData = new FormData();
    formData.append('token', token);
    formData.append('new_password', newPassword);

    fetch('/reset-password?token=' + encodeURIComponent(token), {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage(data.message);
        } else {
          setMessage(data.message || 'Ocorreu um erro ao redefinir a senha.');
        }
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao redefinir a senha.');
        console.error('Erro:', error);
      });
  };

  return (
    <div className="container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Sanofi" height="120px" />
      <h1>Redefinir Senha</h1>
      <form id="reset-password-form" onSubmit={handleSubmit}>
        <input type="hidden" name="token" value={token} />
        <label htmlFor="new_password">Insira sua nova senha:</label>
        <input 
          type="password" 
          id="new_password" 
          name="new_password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <button type="submit">Redefinir Senha</button>
        <div id="response-message" className="response-message" style={{ color: message.includes('sucesso') ? 'green' : 'red' }}>
          {message}
        </div>
      </form>
      <a href="./">Voltar ao Login</a>
    </div>
  );
};

export default Page4;
