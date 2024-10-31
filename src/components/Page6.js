import React, { useEffect, useState } from 'react';
import '../assets/css/page6.css';
import Chart from 'chart.js/auto';

const Page6 = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userPerformanceData, setUserPerformanceData] = useState(null);

  useEffect(() => {
    updateUserInfo();
    fetchTickets();
    fetchUserPerformance();
  }, []);

  const updateUserInfo = () => {
    setUserName('Nome do Usuário');
    setUserEmail('email@exemplo.com');
  };

  const fetchTickets = async () => {
    setLoading(true);
    const fetchedTickets = [{ id: 1, title: "Treinamento 1", training: "Treinamento A", date: "2023-11-01", time: "10:00", link: "#" }];
    setTickets(fetchedTickets);
    setLoading(false);
  };

  const fetchUserPerformance = async () => {
    // Simulação de dados de desempenho do usuário
    const performanceData = {
      labels: ['Treinamento 1', 'Treinamento 2', 'Treinamento 3'],
      data: [85, 90, 70],
    };
    setUserPerformanceData(performanceData);
  };

  const toggleMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
  };

  const closeMenu = () => {
    document.getElementById('side-menu').style.width = '0';
  };

  const handleTicketClick = (ticket) => {
    // Função para lidar com o clique em um ticket
    alert(`Você clicou no ticket: ${ticket.title}`);
  };

  const renderTickets = () => {
    return tickets.map(ticket => (
      <div key={ticket.id} onClick={() => handleTicketClick(ticket)}>
        <h3>{ticket.title}</h3>
        <p><strong>Treinamento:</strong> {ticket.training}</p>
        <p><strong>Data:</strong> {ticket.date}</p>
        <p><strong>Horário:</strong> {ticket.time}</p>
        <p><strong>Link:</strong> <a href={ticket.link} target="_blank" rel="noopener noreferrer">Acessar treinamento</a></p>
      </div>
    ));
  };

  const renderChart = () => {
    if (userPerformanceData) {
      const ctx = document.getElementById('grafico-desempenho').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: userPerformanceData.labels,
          datasets: [{
            label: 'Desempenho do Usuário',
            data: userPerformanceData.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    renderChart();
  }, [userPerformanceData]);

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
          <h1>Treinamentos em Andamento</h1>
        </div>
      </header>

      <div id="side-menu" className="side-menu">
        <button className="closebtn" onClick={closeMenu}>&times;</button>
        <div className="user-info">
          <p><strong id="user-nome">{userName}</strong></p>
          <p id="user-email">{userEmail}</p>
        </div>
        <a href="./page5">User Settings</a>
        <a href="./" onClick={() => console.log('Logout')}>Logout</a>
      </div>

      <main>
        <section>
          <h2>Tickets</h2>
          <div id="tickets-container">
            {loading ? <div>Carregando...</div> : renderTickets()}
          </div>
          <div id="pagination-controls">
            <button id="prev-tickets" style={{ display: 'none' }}>Anterior</button>
            <button id="next-tickets">Próximo</button>
          </div>
        </section>

        {/* Modal para detalhes do treinamento */}
        <div id="ticket-modal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2 id="modal-titulo"></h2>
            <p><strong></strong> <span id="modal-usuarios"></span></p>
            <p><strong>Treinamento:</strong> <span id="modal-treinamento"></span></p>
            <p><strong>Data:</strong> <span id="modal-data"></span></p>
            <p><strong>Horário:</strong> <span id="modal-horario"></span></p>
            <p><strong>Link:</strong> <a id="modal-link" href="#" target="_blank">Acessar treinamento</a></p>
          </div>
        </div>

        <section>
          <h2>Desempenho do Usuário</h2>
          <div id="loadingIndicator" className="loadingIndicator" style={{ display: loading ? 'block' : 'none' }}>Carregando...</div>
          <canvas id="grafico-desempenho"></canvas>
        </section>
      </main>
    </div>
  );
};

export default Page6;