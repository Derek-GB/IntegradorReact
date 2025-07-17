import React from 'react';
import Carnes from './carne';
import Proteinas from './proteinas';
import Verduras from './verduras';
import Olores from './olores';
import Abarrotes from './abarrotes';
import Limpieza from './limpieza';
import { AbastecimientoProvider } from '../context/contextoAbastecimiento';
import { BrowserRouter } from 'react-router-dom'; 
import '../styles/formAbasteci.css';
import '../styles/formulario.css';


const FormularioAbastecimiento = () => {
  return (
    <div className="container main-content">
      <div id="formularioAbarrotes">
        <h2>Formulario de Abastecimiento</h2>
        
        <Carnes />
        <Proteinas />
        <Verduras />
        <Olores />
        <Abarrotes />
        <Limpieza />

      
      </div>
    </div>
  );
};

export default FormularioAbastecimiento;