import React from 'react';
import Carnes from './Carne';
import Proteinas from './Proteinas';
import Verduras from './Verduras';
import Olores from './Olores';
import Abarrotes from './Abarrotes';
import Limpieza from './Limpieza';
import { AbastecimientoProvider } from '../context/contextoAbastecimiento';
import { BrowserRouter } from 'react-router-dom'; 
import '../styles/formularioFusionado.css'; // Asegúrate de tener este archivo con tus estilos


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
    </div>
  );
};

export default FormularioAbastecimiento;