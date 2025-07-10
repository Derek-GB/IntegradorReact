import React, { useState } from 'react';
import '../styles/formulario.css';
import '../styles/indexx.css';

const AyudaForm = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombreCabeza: '',
    tipoAyuda: '',
    fecha: '',
    responsable: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Consulta enviada:', formData);
  };

  return (
    <div className="container main-content mt-4">

      <h2>
        <button
          onClick={() => navigate('/inicio')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)', padding: '8px' }}
          aria-label="Regresar"
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Consulta de Ayudas
      </h2>

      <form onSubmit={handleSubmit}>
        <details open className="consulta-ayuda">
          <summary><strong>Consultas de Ayudas</strong></summary>
          <fieldset>
            <label htmlFor="codigo">Código:</label>
            <input id="codigo" name="codigo" type="text" value={formData.codigo} onChange={handleChange} />

            <label htmlFor="nombreCabeza">Nombre de la cabeza de familia:</label>
            <input id="nombreCabeza" name="nombreCabeza" type="text" value={formData.nombreCabeza} onChange={handleChange} />

            <label htmlFor="tipoAyuda">Tipo de ayuda:</label>
            <select id="tipoAyuda" name="tipoAyuda" value={formData.tipoAyuda} onChange={handleChange}>
              <option value="">Seleccione el tipo de ayuda</option>
              <option value="imas">IMAS</option>
              <option value="cruzroja">Cruz Roja</option>
              <option value="cne">CNE</option>
              <option value="refugio">Refugio</option>
              <option value="otros">Otros</option>
            </select>

            <label htmlFor="fecha">Fecha:</label>
            <input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} />

            <label htmlFor="responsable">Responsable:</label>
            <input id="responsable" name="responsable" type="text" value={formData.responsable} onChange={handleChange} />

            <button type="submit" className="btn btn-primary mt-2">Consultar</button>
            <button type="button" className="btn btn-secondary mt-2">Agregar</button>
          </fieldset>
        </details>
      </form>
    </div>
  );
};

export default AyudaForm;