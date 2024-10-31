import React, { useEffect, useState } from 'react';
import '../assets/css/page10.css';
import { logout } from '../utils/logout';

const Page10 = () => {
  const [userInfo, setUserInfo] = useState({
    nome: 'Nome do Usuário',
    email: 'email@dominio.com',
  });

  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);
  const [usuariosDisponiveis, setUsuariosDisponiveis] = useState([]);

  useEffect(() => {
    updateUserInfo();
    setUsuariosDisponiveis(['Usuário 1', 'Usuário 2', 'Usuário 3']);
  }, []);

  const toggleMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
  };

  const closeMenu = () => {
    document.getElementById('side-menu').style.width = '0';
  };

  const updateUserInfo = () => {
    setUserInfo({
      nome: 'Novo Nome',
      email: 'novoemail@dominio.com',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      usuario: usuariosSelecionados, // Envie os usuários selecionados
      treinamento: document.getElementById('treinamento').value,
      data: document.getElementById('data').value,
      time: document.getElementById('time').value,
      link: document.getElementById('link').value,
    };
    console.log('Dados do treinamento:', formData);
  };

  const toggleUserSelection = (usuario) => {
    setUsuariosSelecionados((prev) => {
      if (prev.includes(usuario)) {
        return prev.filter((u) => u !== usuario);
      } else {
        return [...prev, usuario];
      }
    });
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Logo Sanofi" className="logo" />
          <h1>Gerenciamento de Treinamentos</h1>
        </div>
      </header>

      <nav id="side-menu" className="side-menu">
        <button className="closebtn" onClick={closeMenu}>&times;</button>
        <div className="user-info">
          <p><strong>{userInfo.nome}</strong></p>
          <p>{userInfo.email}</p>
        </div>
        <a href="./page9">Admin Management</a>
        <a href="./page5">User Settings</a>
        <a href="./" onClick={logout}>Logout</a>
      </nav>

      <main className="container">
        <section id="visualizar-treinamentos">
          <h2>Cadastrar Treinamento</h2>
          <form id="form-treinamento" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario">Usuários:</label>
              <div id="usuario-container" className="usuario-container" onClick={() => setUsuariosDisponiveis((prev) => (prev.length ? [] : ['Usuário 1', 'Usuário 2', 'Usuário 3']))}>
                <input type="text" id="usuario" readOnly placeholder="Selecione os usuários" value={usuariosSelecionados.join(', ')} />
                {usuariosDisponiveis.length > 0 && (
                  <div className="usuario-list">
                    {usuariosDisponiveis.map((usuario) => (
                      <div key={usuario} onClick={() => toggleUserSelection(usuario)}>
                        {usuario} {usuariosSelecionados.includes(usuario) ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="treinamento">Treinamento:</label>
              <input type="text" id="treinamento" required />
            </div>
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <input type="date" id="data" required />
            </div>
            <div className="form-group">
              <label htmlFor="time">Horário:</label>
              <input type="time" id="time" required />
            </div>
            <div className="form-group">
              <label htmlFor="link">Link do Treinamento:</label>
              <input type="url" id="link" required />
            </div>
            <div className="form-button">
              <button type="submit" id="add">Adicionar</button>
            </div>
            <p id="confirmation-message" className="confirmation-message"></p>
          </form>
        </section>

        <section>
          <h2>Tickets</h2>
          <div id="tickets-container"></div>
          <div id="pagination-controls">
            <button id="prev-tickets" style={{ display: 'none' }}>Anterior</button>
            <button id="next-tickets">Próximo</button>
          </div>
        </section>

        <section>
          <h2>Desempenho dos Usuários</h2>
          <div id="loadingIndicator" className="loading" style={{ display: 'none' }}>Carregando...</div>
          <canvas id="progressChart"></canvas>
        </section>
      </main>

      {/* Modal para detalhes do treinamento */}
      <div id="ticket-modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2 id="modal-titulo"></h2>
          <p><strong>Usuários cadastrados:</strong> <span id="modal-usuarios"></span></p>
          <p><strong>Ausentes:</strong> <span id="modal-usuarios-nao-concluintes"></span></p>
          <p><strong>Data:</strong> <span id="modal-data"></span></p>
          <p><strong>Horário:</strong> <span id="modal-horario"></span></p>
          <p><strong>Link:</strong> <a id="modal-link" href="#" target="_blank">Acessar treinamento</a></p>
        </div>
      </div>
    </div>
  );
};

export default Page10;
