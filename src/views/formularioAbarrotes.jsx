import React, { useState } from 'react';
import Carnes from '../components/carne';
import Proteinas from '../components/Proteinas';
import Verduras from '../components/Verduras';
import Olores from '../components/olores';
import Abarrotes from '../components/abarrotes';
import Limpieza from '../components/limpieza';
import ResumenParcial from './abastecimiento/resumenParcial';
import ResumenFinal from './abastecimiento/resumenFinal';
import '../styles/formAbasteci.css';

const FormularioAbastecimiento = () => {
  const [mostrarResumenParcial, setMostrarResumenParcial] = useState(false);
  const [mostrarResumenFinal, setMostrarResumenFinal] = useState(false);
  const [seccionAbierta, setSeccionAbierta] = useState('');

  const handleIrAResumenParcial = () => {
    setMostrarResumenParcial(true);
  };

  const handleVolverFormulario = () => {
    setMostrarResumenParcial(false);
    setMostrarResumenFinal(false);
  };

  const handleVerResumenFinal = () => {
    setMostrarResumenFinal(true);
  };

  const manejarAbrirSeccion = (nombreSeccion) => (event) => {
    event.preventDefault(); 
    setSeccionAbierta(prev => (prev === nombreSeccion ? '' : nombreSeccion));
  };

  return (
    <div className="contenedor-formulario">
      {mostrarResumenParcial ? (
        <>
          <ResumenParcial />
          <div className="botones-formulario">
            <button onClick={handleVolverFormulario} className="btn-volver">
              Volver al Formulario
            </button>
          </div>
        </>
      ) : mostrarResumenFinal ? (
        <>
          <ResumenFinal />
          <div className="botones-formulario">
            <button onClick={handleVolverFormulario} className="btn-volver">
              Volver al Formulario
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="titulo-formulario">Formulario de Abastecimiento</h1>
          <div className="form-seccion">
            <Carnes 
              abierto={seccionAbierta === 'Carnes'} 
              alAbrir={manejarAbrirSeccion('Carnes')} 
            />
            <Proteinas 
              abierto={seccionAbierta === 'Proteinas'} 
              alAbrir={manejarAbrirSeccion('Proteinas')} 
            />
            <Verduras 
              abierto={seccionAbierta === 'Verduras'} 
              alAbrir={manejarAbrirSeccion('Verduras')} 
            />
            <Olores 
              abierto={seccionAbierta === 'Olores'} 
              alAbrir={manejarAbrirSeccion('Olores')} 
            />
            <Abarrotes 
              abierto={seccionAbierta === 'Abarrotes'} 
              alAbrir={manejarAbrirSeccion('Abarrotes')} 
            />
            <Limpieza 
              abierto={seccionAbierta === 'Limpieza'} 
              alAbrir={manejarAbrirSeccion('Limpieza')} 
            />
          </div>
          <div className="botones-formulario">
            <button onClick={handleIrAResumenParcial} className="btn-resumen">
              Ver Resumen Parcial
            </button>
            <button onClick={handleVerResumenFinal} className="btn-resumen-final">
              Ver Resumen Final
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormularioAbastecimiento;
