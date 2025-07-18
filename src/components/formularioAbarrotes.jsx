import React from 'react';
import Carnes from './Carne';
import Proteinas from './Proteinas';
import Verduras from './Verduras';
import Olores from './Olores';
import Abarrotes from './Abarrotes';
import Limpieza from './Limpieza';
import '../styles/formAbasteci.css';

const FormularioAbastecimiento = () => {
  return (
    <div className="content-area">
      <div className="top-header">
        <h1>Formulario de Abastecimiento</h1>
      </div>

      <div className="main-content">
        <div id="formularioAbarrotes">
          {/* Secciones independientes */}
          <Carnes />
          <Proteinas />
          <Verduras />
          <Olores />
          <Abarrotes />
          <Limpieza />
        </div>
      </div>
    </div>
  );
};

export default FormularioAbastecimiento;
