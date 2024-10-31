import React, { useEffect, useState } from 'react';
import '../assets/css/page9.css';
import { logout } from '../utils/logout';

const Page9 = () => {
  const [userInfo, setUserInfo] = useState({
    nome: 'Nome do Usuário',
    email: 'email@dominio.com',
  });

  useEffect(() => {
  }, []);

  const toggleMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
  };

  const closeMenu = () => {
    document.getElementById('side-menu').style.width = '0';
  };

  const closeModal = () => {
    document.getElementById('userTypeModal').style.display = 'none';
  };

  const confirmChange = () => {
    // Lógica para confirmar a alteração de tipo de usuário
  };

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
          <h1>Gerenciamento de Acesso</h1>
        </div>
      </header>

      <div id="side-menu" className="side-menu">
        <button className="closebtn" onClick={closeMenu}>&times;</button>
        <div className="user-info">
          <p><strong>{userInfo.nome}</strong></p>
          <p>{userInfo.email}</p>
        </div>
        <a href="./page10">Dashboard</a>
        <a href="./page5">User Settings</a>
        <a href="./" onClick={logout}>Logout</a>
      </div>

      <main>
        <div className="content-container">
          <div id="feedbackMessage" className="feedback"></div>
          <table id="usersTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Permissão</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Os dados dos usuários serão inseridos aqui via JavaScript */}
            </tbody>
          </table>
        </div>
        <div id="loadingIndicator" className="loading" style={{ display: 'none' }}>Carregando...</div>
      </main>

      {/* Modal para alterar tipo de usuário */}
      <div id="userTypeModal" className="modal" style={{ display: 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Alterar Permissão do Usuário</h2>
          <p id="modal-user-name"></p>
          <select id="newUserType">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button id="confirmChange" onClick={confirmChange}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Page9;