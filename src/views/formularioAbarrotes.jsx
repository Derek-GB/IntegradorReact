import React, { useState } from 'react';
import Carnes from '../components/carne';
import Proteinas from '../components/Proteinas';
import Verduras from '../components/Verduras';
import Olores from '../components/olores';
import Abarrotes from '../components/abarrotes';
import Limpieza from '../components/limpieza';
import ResumenParcial from './abastecimiento/resumenParcial';
import ResumenFinal from './abastecimiento/resumenFinal'; // ⬅️ Asegúrate de tener este componente

const FormularioAbastecimiento = () => {
  const [mostrarResumenParcial, setMostrarResumenParcial] = useState(false);
  const [mostrarResumenFinal, setMostrarResumenFinal] = useState(false);

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
        <Carnes />
        <Proteinas />
        <Verduras />
        <Olores />
        <Abarrotes />
        <Limpieza />
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