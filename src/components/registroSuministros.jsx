import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formularioFusionado.css';

const RegistroSuministros = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    descripcionProducto: '',
    codigo: '',
    categoriaProducto: '',
    cantidad: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Datos registrados:', form);
    // Aquí podrías hacer un POST a tu backend
  };

  return (
    <>
      <div className="header">
        <h2>Registro de Suministros</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>

      <div className="formPreFormulario main-content" onSubmit={handleSubmit}>
        
          <fieldset id='registroSuministrosField' className=" mt-2">

            <legend className="legendPrincipalProducto mt-3"><strong>Información del Producto</strong></legend>

            <div id='registroSuministros1'>
              <div id='divProducto'>
                <label>Nombre del Producto:</label>
                <input type='text' name="nombre" className=" mb-2" onChange={handleChange} placeholder="Ingrese el Nombre" />
              </div>
              <div id='divProducto'>

                <label>Código:</label>
                <input type="number" name="codigo" className=" mb-2" onChange={handleChange} placeholder="Ingrese el código del producto" />
              </div>

              <div id='divProducto'>
                <label>Categoría del Producto:</label>
                <select name="categoriaProducto" className="form-select mb-2" onChange={handleChange}>
                  <option>Seleccione una categoría</option>
                  <option>Alimentos</option>
                  <option>Higiene</option>
                  <option>Ropa</option>
                  <option>Medicamentos</option>
                  <option>Otros</option>
                </select>
              </div>

              <div id='divProducto'>
                <label>Cantidad:</label>
                <input type="number" name="cantidad" className="form-control mb-2" onChange={handleChange} placeholder="Ingrese la cantidad" />
              </div>

            </div>
            <label>Descripción del Producto:</label>
            <input type='text' name="descripcionProducto" className="form-control mb-2" onChange={handleChange} placeholder="Descripción del producto" />
            <button type="submit" className="btn btn-success mt-3">Registrar</button>
          </fieldset>


      </div>
    </>

  );
};

export default RegistroSuministros;
