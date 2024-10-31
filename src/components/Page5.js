import React, { useEffect, useState } from 'react';
import '../assets/css/page5.css';

const Page5 = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    updateUserInfo();

    // Simulação de configuração do tipo de usuário
    setUserType('user');
  }, []);

  const updateUserInfo = () => {
    const fetchedUserName = 'Nome do Usuário';
    const fetchedUserEmail = 'email@exemplo.com';
    setUserName(fetchedUserName);
    setUserEmail(fetchedUserEmail);
  };

  const toggleMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
  };

  const closeMenu = () => {
    document.getElementById('side-menu').style.width = '0';
  };

  const displayFeedback = (message, type) => {
    setFeedbackMessage(message);
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.className = `feedback ${type}`;
    feedbackElement.style.display = 'block';
  };

  const handleUpdateName = (event) => {
    event.preventDefault();
    const newName = event.target.newName.value;

    if (!newName) {
      displayFeedback('O nome não pode estar vazio.', 'error');
      return;
    }

    fetch('/user-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'update-name': 'true',
        'new-name': newName,
      }),
    })
      .then(response => response.json())
      .then(data => {
        displayFeedback(data.message, data.status);
        if (data.status === 'success') {
          setTimeout(() => {
            window.location.reload(); // Recarrega a página após 1,5 segundos
          }, 1500);
        }
      })
      .catch(error => {
        displayFeedback('Erro ao atualizar o nome de usuário: ' + error.message, 'error');
      });
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;

    if (!currentPassword || !newPassword) {
      displayFeedback('Senha atual e nova senha são obrigatórias.', 'error');
      return;
    }

    fetch('/user-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'update-password': 'true',
        'current-password': currentPassword,
        'new-password': newPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        displayFeedback(data.message, data.status);
        if (data.status === 'success') {
          setTimeout(() => {
            window.location.reload(); // Recarrega a página após 1,5 segundos
          }, 1500);
        }
      })
      .catch(error => {
        displayFeedback('Erro ao atualizar a senha: ' + error.message, 'error');
      });
  };

  const configureBackButton = () => {
    const backButton = document.getElementById('backButton');
    backButton.href = userType === 'admin' ? '/admin' : '/user';
  };

  useEffect(() => {
    configureBackButton();
  }, [userType]);

  return (
    <div>
      <header>
        <div className="menu-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="header-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Logo" className="logo" />
          <h1>Configuração de Usuário</h1>
        </div>
      </header>

      <div id="feedbackMessage" className="feedback">{feedbackMessage}</div>

      <div id="side-menu" className="side-menu">
        <button className="closebtn" onClick={closeMenu}>&times;</button>
        <div className="user-info">
          <p><strong id="user-nome">{userName}</strong></p>
          <p id="user-email">{userEmail}</p>
        </div>
        <a href="./" onClick={() => console.log('Logout')}>Logout</a>
      </div>

      <main>
        <div className="config-form">
          <h2>Atualizar Nome de Usuário</h2>
          <form id="updateNameForm" onSubmit={handleUpdateName}>
            <label htmlFor="new-name">Novo Nome de Usuário:</label>
            <input type="text" id="new-name" name="newName" required />
            <button type="submit" name="update-name">Atualizar Nome</button>
          </form>

          <h2>Atualizar Senha</h2>
          <form id="updatePasswordForm" onSubmit={handleUpdatePassword}>
            <label htmlFor="current-password">Senha Atual:</label>
            <input type="password" id="current-password" name="currentPassword" required />

            <label htmlFor="new-password">Nova Senha:</label>
            <input type="password" id="new-password" name="newPassword" required />
            <button type="submit" name="update-password">Atualizar Senha</button>
          </form>

          <a id="backButton" href="#"><button>Voltar</button></a>
        </div>
      </main>
    </div>
  );
};

export default Page5;
