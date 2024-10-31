import React from 'react';
import '../assets/css/page8.css';

const Page8 = () => {
  return (
    <div className="confirmation-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_Sanofi_%282022%29.png" alt="Sanofi" />
      <h2>Arquivo Enviado com Sucesso!</h2>
      <p>Seu arquivo foi enviado com sucesso. Agradecemos por utilizar nosso sistema.</p>
      <div className="confirmation-options">
        <a href="./">Voltar para a página inicial</a>
      </div>
    </div>
  );
};

export default Page8;
