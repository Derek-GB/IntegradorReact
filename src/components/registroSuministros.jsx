import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/formulario.css';
import '../styles/indexx.css';

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
    <div className="container main-content">

      <h2>
        <button
          onClick={() => navigate('/inicio')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)', padding: '8px' }}
          aria-label="Regresar"
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Registro de Suministros
      </h2>

      <form onSubmit={handleSubmit}>
        <details open>
          <summary><strong>Registro de Suministros</strong></summary>
          <fieldset className="mt-2">
            <label>Nombre del Producto:</label>
            <input name="nombre" className="form-control mb-2" onChange={handleChange} placeholder="Ingrese el Nombre" />

            <label>Descripción del Producto:</label>
            <input name="descripcionProducto" className="form-control mb-2" onChange={handleChange} placeholder="Descripción del producto" />

            <label>Código:</label>
            <input type="number" name="codigo" className="form-control mb-2" onChange={handleChange} placeholder="Ingrese el código del producto" />

            <label>Categoría del Producto:</label>
            <select name="categoriaProducto" className="form-select mb-2" onChange={handleChange}>
              <option>Seleccione una categoría</option>
              <option>Alimentos</option>
              <option>Higiene</option>
              <option>Ropa</option>
              <option>Medicamentos</option>
              <option>Otros</option>
            </select>

            <label>Cantidad:</label>
            <input type="number" name="cantidad" className="form-control mb-2" onChange={handleChange} placeholder="Ingrese la cantidad" />
          </fieldset>
        </details>
        <button type="submit" className="btn btn-primary mt-3">Agregar</button>
      </form>
    </div>
  );
};

export default RegistroSuministros;
