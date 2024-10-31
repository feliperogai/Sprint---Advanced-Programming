import React, { useEffect, useState } from 'react';
import '../assets/css/page7.css';

const Page7 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    signature: ''
  });

  useEffect(() => {
    const now = new Date();
    const datetimeLocal = now.toISOString().slice(0, 16);
    setFormData(prevData => ({ ...prevData, date: datetimeLocal }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message || 'Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className="container">
      <center>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="sanofi" height="120px" />
      </center>
      <h2>Formulário de Presença</h2>
      <form id="dataForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome Completo:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="date">Data e Hora do Treinamento:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        /><br />

        <label htmlFor="signature">Assinatura:</label>
        <input
          type="text"
          id="signature"
          name="signature"
          value={formData.signature}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Enviar</button>
      </form>
      <a href="./">Voltar ao Login</a>
    </div>
  );
};

export default Page7;