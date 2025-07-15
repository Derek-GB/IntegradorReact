import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formularioFusionado.css'; // Asegúrate de tener este archivo con

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
    <>
      <div className="header">
        <h2>Revisión de ayudas</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>
      <div className="formPreFormulario main-content mt-4">

        <div className='form-ayuda-revision' onSubmit={handleSubmit}>
          <fieldset className=' mt-2'>
            <div className="divAyudas">
              <div className='divAyuda'>
                <label>Código:</label>
                <input id="codigo" name="codigo" type="text" value={formData.codigo} onChange={handleChange} />
              </div>
              <div className='divAyuda'>
                <label>Nombre del Cabeza de Familia:</label>
                <input id="nombreCabeza" name="nombreCabeza" type="text" value={formData.nombreCabeza} onChange={handleChange} />
              </div>
              
              <div className="divAyuda">
                <label htmlFor="fecha">Fecha:</label>
                <input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
              </div>
            
            </div>

            <div className="divAyudas">

              <div className="divAyuda">
                <label>Tipo de ayuda:</label>
                <select id="tipoAyuda" name="tipoAyuda" value={formData.tipoAyuda} onChange={handleChange}>
                  <option value="">Seleccione el tipo de ayuda</option>
                  <option value="imas">IMAS</option>
                  <option value="cruzroja">Cruz Roja</option>
                  <option value="cne">CNE</option>
                  <option value="refugio">Refugio</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

                <div className="divAyuda">
                <label htmlFor="responsable">Funcionario responsable:</label>
                <input id="responsable" name="responsable" type="text" value={formData.responsable} onChange={handleChange} />
              </div>

            </div>
             <div className="btnsAyuda">
                <button type="submit" className="btn btn-primary mt-2">Consultar</button>
                <button type="button" className="btn btn-secondary mt-2">Agregar</button>
              </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default AyudaForm;