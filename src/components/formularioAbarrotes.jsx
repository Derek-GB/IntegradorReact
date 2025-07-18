import React, { useState } from 'react';
import Carnes from './Carne';
import Proteinas from './Proteinas';
import Verduras from './Verduras';
import Olores from './olores';
import Abarrotes from './abarrotes';
import Limpieza from './limpieza';
import ResumenParcial from './resumenParcial';
import '../styles/formAbasteci.css';

const FormularioAbastecimiento = () => {
  const [mostrarResumen, setMostrarResumen] = useState(false);

  return (
    <div className="content-area">
      <div className="top-header">
        <h1>Formulario de Abastecimiento</h1>
        {!mostrarResumen && (
          <button onClick={() => setMostrarResumen(true)}>
            Ir a Resumen Parcial
          </button>
        )}
        {mostrarResumen && (
          <button onClick={() => setMostrarResumen(false)}>
            Volver al Formulario
          </button>
        )}
      </div>

      {!mostrarResumen ? (
        <div className="main-content">
          <div id="formularioAbarrotes">
            <Carnes />
            <Proteinas />
            <Verduras />
            <Olores />
            <Abarrotes />
            <Limpieza />
          </div>
        </div>
      ) : (
        <ResumenParcial />
      )}
    </div>
  );
};

export default FormularioAbastecimiento;