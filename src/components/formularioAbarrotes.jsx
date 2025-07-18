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
      <header className="top-header">
        <h1>Formulario de Abastecimiento</h1>
      </header>

      {!mostrarResumen ? (
        <main className="main-content">
          <section className="secciones-formulario">
            <Carnes />
            <Proteinas />
            <Verduras />
            <Olores />
            <Abarrotes />
            <Limpieza />
          </section>
        </main>
      ) : (
        <>
          <ResumenParcial />
          {/* Si quieres que el botón "Volver al Formulario" también esté fijo abajo,
              tendrías que moverlo aquí también o manejarlo dentro de .botones-accion */}
        </>
      )}

      {/* Este div.botones-accion ahora está fuera del main y fijo al final del content-area */}
      {/* Condicionalmente renderiza los botones según si es el formulario o el resumen */}
      <div className="botones-accion-fijo"> {/* CAMBIADO A NUEVO NOMBRE DE CLASE */}
        {!mostrarResumen ? (
          <>
            <button
              onClick={() => setMostrarResumen(true)}
              className="btn-toggle"
              type="button"
            >
              Ir a Resumen Parcial
            </button>

            <button
              onClick={() => navigate('/confirmacion')}
              className="btn-submit"
              type="button"
            >
              Enviar formulario
            </button>
          </>
        ) : (
          <button
            onClick={() => setMostrarResumen(false)}
            className="btn-toggle"
            type="button"
          >
            Volver al Formulario
          </button>
        )}
      </div>
    </div>
  );
};

export default FormularioAbastecimiento;