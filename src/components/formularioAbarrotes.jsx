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

  const handleIrAResumen = () => {
    setMostrarResumen(true);
  };

  const handleVolverFormulario = () => {
    setMostrarResumen(false);
  };

  return (
    <div className="contenedor-formulario">
      {!mostrarResumen ? (
        <>
          <h1 className="titulo-formulario">Formulario de Abastecimiento</h1>
          <div className="form-seccion">
            <Carnes />
            <Proteinas />
            <Verduras />
            <Olores />
            <Abarrotes />
            <Limpieza />
          </div>
          <div className="botones-formulario">
            <button onClick={handleIrAResumen} className="btn-resumen">
              Ver Resumen Parcial
            </button>
            <button className="btn-enviar">
              Enviar Formulario
            </button>
          </div>
        </>
      ) : (
        <>
          <ResumenParcial />
          <div className="botones-formulario">
            <button onClick={handleVolverFormulario} className="btn-volver">
              Volver al Formulario
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormularioAbastecimiento;
