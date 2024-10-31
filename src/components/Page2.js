import React from 'react';
import '../assets/css/page2.css';
import logo from '../assets/images/icon.jpg';

const Page2 = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    // Limpa as mensagens de erro anteriores
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    // Validação de Nome de Usuário
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
      document.getElementById('nameError').textContent = 'O nome de usuário é obrigatório.';
      valid = false;
    }

    // Validação de E-mail
    const email = document.getElementById('email').value;
    if (email.trim() === '') {
      document.getElementById('emailError').textContent = 'O e-mail é obrigatório.';
      valid = false;
    } else if (!validateEmail(email)) {
      document.getElementById('emailError').textContent = 'O e-mail deve ser válido.';
      valid = false;
    }

    // Validação de Senha
    const password = document.getElementById('password').value;
    if (password.trim() === '') {
      document.getElementById('passwordError').textContent = 'A senha é obrigatória.';
      valid = false;
    }

    // Validação de Confirmação de Senha
    const confirmPassword = document.getElementById('confirm-password').value;
    if (confirmPassword.trim() === '') {
      document.getElementById('confirmPasswordError').textContent = 'A confirmação de senha é obrigatória.';
      valid = false;
    } else if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = 'As senhas não correspondem.';
      valid = false;
    }

    if (valid) {
      // Se o formulário for válido, envia os dados via AJAX
      fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.redirect) {
          // Redireciona para a página de login
          window.location.href = data.redirect;
        } else if (data.mensagem) {
          // Exibe a mensagem retornada pelo servidor
          alert(data.mensagem);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao registrar o usuário.');
      });
    }
  };

  // Função para validar o formato do e-mail
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="container">
      <div className="registration-form">
        <center>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Sanofi" />
        </center>
        <h2>Criar Conta</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome de Usuário:</label>
            <input type="text" id="name" name="name" required />
            <div id="nameError" className="error"></div>
          </div>
          
          <div>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required />
            <div id="emailError" className="error"></div>
          </div>
          
          <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
            <div id="passwordError" className="error"></div>
          </div>
          
          <div>
            <label htmlFor="confirm-password">Confirme a Senha:</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
            <div id="confirmPasswordError" className="error"></div>
          </div>
          
          <button type="submit">Cadastrar</button>
        </form>
        <p className="signup-prompt">Já tem uma conta? <a href="./">Faça login</a></p>
      </div>
    </div>
  );
};

export default Page2;