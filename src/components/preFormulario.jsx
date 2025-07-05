import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta


const PreFormulario = () => {
  const [evento, setEvento] = useState('');
  const [integrantes, setIntegrantes] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!integrantes || integrantes < 0) {
      alert("Por favor, ingrese una cantidad válida de integrantes.");
      return;
    }
    localStorage.setItem('cantidadIntegrantes', integrantes - 1);
    navigate('/formulario');
  };

  return (
    <>
     <div className="header">
      <h2>      
        Registro Familias
      </h2>
        <button 
          onClick={() => navigate('../')}
          className="btn-header"
          aria-label="Regresar"
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
      </div> 
    
    <div className="preContainer main-content">

      

      <form>
        <details open>
          <summary><strong>Información del Evento</strong></summary>
          <fieldset className="mt-2">
            <label>Tipo de Evento o Emergencia:</label>
            <select className="form-control mb-2" value={evento} onChange={e => setEvento(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="inundacion">Inundación</option>
              <option value="terremoto">Terremoto</option>
              <option value="incendio">Incendio</option>
              <option value="deslizamiento">Deslizamiento</option>
            </select>

            <label>Cantidad de Integrantes Adicionales:</label>
            <input
              type="number"
              className="form-control mb-2"
              value={integrantes}
              onChange={e => setIntegrantes(e.target.value)}
              placeholder="Ingrese la cantidad"
            />
          </fieldset>
        </details>
        <button type="button" className="btn btn-primary mt-3" onClick={handleContinue}>
          Continuar
        </button>
      </form>
    </div>
    </>
    
  );
};

export default PreFormulario;