import React, { useEffect, useState } from 'react';
import "../../styles/formularioFusionado.css";
import "../../styles/menuPrincipal.css";
import { useNavigate } from 'react-router-dom';

function FormularioAbastecimiento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: '',
    tipo: '',
    cantidad: '',
    albergue: '',
  });

  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    localStorage.removeItem('datosFormulario');
    setFormData({
      fecha: '',
      tipo: '',
      cantidad: '',
      albergue: '',
    });
    setGuardado(false);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    const { fecha, tipo, cantidad, albergue } = formData;
    if (!fecha || !tipo || !cantidad || !albergue) {
      alert('Complete todos los campos');
      return;
    }

    localStorage.setItem('datosFormulario', JSON.stringify(formData));
    setGuardado(true);
  };

  const handleEnviar = () => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    if (!datosGuardados) {
      alert('Debe guardar el formulario antes de enviar.');
      return;
    }

    const { fecha, tipo, cantidad, albergue } = formData;
    if (!fecha || !tipo || !cantidad || !albergue) {
      alert('Complete todos los campos');
      return;
    }

    navigate('/formularioAbarrotes.jsx');
  };

  return (
    <div className="content-area">
      <div id="sidebar-container">
        <header className="top-header">
          <h1>Formulario de Abastecimiento</h1>
          <a href="#" className="back-button">
            <span className="material-icons">arrow_back</span>
          </a>
        </header>
        <main className="main-content">
          <div className="card">
            <form id="formularioAbastecimiento" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="fecha">Fecha:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tipo">Tipo de comida:</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="desayuno">Desayuno</option>
                  <option value="almuerzo">Almuerzo</option>
                  <option value="cena">Cena</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad de personas:</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  min="1"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="albergue">Nombre del albergue:</label>
                <select
                  id="albergue"
                  name="albergue"
                  value={formData.albergue}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un albergue</option>
                  <option value="Liceo de Bebedero">Liceo de Bebedero</option>
                  <option value="Escuela de Bebedero">Escuela de Bebedero</option>
                  <option value="Gimnasio Municipal - Manuel Melico Corella">Gimnasio Municipal - Manuel Melico Corella</option>
                  <option value="Universidad Invenio">Universidad Invenio</option>
                  <option value="Salón Comunal de Javilla">Salón Comunal de Javilla</option>
                  <option value="Salón Comunal de Paso Lajas">Salón Comunal de Paso Lajas</option>
                  <option value="Salón de Eventos de eventos Municipal">Salón de Eventos de eventos Municipal</option>
                  <option value="Escuela San Cristobal">Escuela San Cristobal</option>
                  <option value="Colegio Técnico Profesional de Cañas">Colegio Técnico Profesional de Cañas</option>
                  <option value="Salón comunal de Barrio Las Palmas">Salón comunal de Barrio Las Palmas</option>
                  <option value="Escuela Monseñor Luis Leipold">Escuela Monseñor Luis Leipold</option>
                  <option value="Escuela Antonio Obando Espinoza">Escuela Antonio Obando Espinoza</option>
                  <option value="Salón Comunal de Porozal">Salón Comunal de Porozal</option>
                  <option value="Escuela San Miguel">Escuela San Miguel</option>
                  <option value="Escuela Barrio Hotel de Cañas">Escuela Barrio Hotel de Cañas</option>
                  <option value="Escuela Corobicí">Escuela Corobicí</option>
                  <option value="Gimnasio Antonio Obando Espinoza">Gimnasio Antonio Obando Espinoza</option>
                  <option value="Salón Comunal Hotel">Salón Comunal Hotel</option>
                </select>
              </div>

              <div className="botones-accion">
                <button
                  type="button"
                  id="btnGuardar"
                  onClick={handleGuardar}
                  style={{
                    backgroundColor: guardado ? '#059669' : undefined,
                  }}
                >
                  {guardado ? 'Guardado' : 'Guardar'}
                </button>
                <button
                  type="button"
                  className="btn-enviar"
                  onClick={handleEnviar}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FormularioAbastecimiento;
