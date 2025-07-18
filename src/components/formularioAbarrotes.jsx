import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Carnes from './Carne';
import Proteinas from './Proteinas';
import Verduras from './Verduras';
import Olores from './Olores';
import Abarrotes from './Abarrotes';
import Limpieza from './Limpieza';
import ResumenParcial from './resumenParcial';

import '../styles/formAbasteci.css';

const FormularioAbastecimiento = () => {
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="content-area">
      <div className="top-header">
        <h1>Formulario de Abastecimiento</h1>
        {!mostrarResumen ? (
          <button onClick={() => setMostrarResumen(true)}>
            Ir a Resumen Parcial
          </button>
        ) : (
          <button onClick={() => setMostrarResumen(false)}>
            Volver al Formulario
          </button>
        )}
      </div>

      {!mostrarResumen ? (
        <div className="main-content">
          <Carnes />
          <Proteinas />
          <Verduras />
          <Olores />
          <Abarrotes />
          <Limpieza />
          <div className="botones-accion">
            <button onClick={() => navigate('/confirmacion')}>
              Enviar formulario
            </button>
          </div>
        </div>
      ) : (
        <ResumenParcial />
      )}
    </div>
  );
};

export default FormularioAbastecimiento;
