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
      <h2>Formulario de Abastecimiento</h2>
      {/* Secciones independientes */}
      <Carnes />
      <Proteinas />
      <Verduras />
      <Olores />
      <Abarrotes />
      <Limpieza />
      <footer>
        <p>© 2025 Integrador I - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default FormularioAbastecimiento;