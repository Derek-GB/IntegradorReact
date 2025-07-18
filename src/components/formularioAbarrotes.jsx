import React from 'react';
import Carnes from './Carne';
import Proteinas from './Proteinas';
import Verduras from './Verduras';
import Olores from './Olores';
import Abarrotes from './Abarrotes';
import Limpieza from './Limpieza';
import { useNavigate } from 'react-router-dom';
import { AbastecimientoProvider } from '../context/contextoAbastecimiento';

import '../styles/formAbasteci.css';

import { BrowserRouter } from 'react-router-dom'; 
import '../styles/formAbasteci.css'; // Asegúrate de tener este archivo con tus estilos



const FormularioAbastecimiento = () => {
  const navigate = useNavigate();
  return (
    <div className="container main-content">
      <h2>Formulario de Abastecimiento</h2>
      {/* Secciones independientes */}
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
  );
};

export default FormularioAbastecimiento;