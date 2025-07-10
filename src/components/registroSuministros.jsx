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
    <>
    
    <div className="header">
      <h2>
        Registro de Suministros
      </h2>
      <button className="btn-header">
        <span className="material-icons">arrow_back</span>
        </button>
    </div>

    <div className="preContainer main-content">
      <form className="formPreFormulario" onSubmit={handleSubmit}>
        <details open>
          <summary><strong>Registro de Suministros</strong></summary>
          <fieldset id='registroSuministrosField' className=" mt-2">

            <div id='registroSuministros1'>
              <label>Nombre del Producto:</label>
              <input type='text' name="nombre" className=" mb-2" onChange={handleChange} placeholder="Ingrese el Nombre" />
              <label>Código:</label>
              <input type="number" name="codigo" className=" mb-2" onChange={handleChange} placeholder="Ingrese el código del producto" /> 
            </div>

           <div id='registroSuministros2'>
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
          
                  </div>

            <label>Descripción del Producto:</label>
                <input type='text' name="descripcionProducto" className="form-control mb-2" onChange={handleChange} placeholder="Descripción del producto" />


         </fieldset>
        </details>
        <button type="submit" className="btn btn-primary mt-3">Agregar</button>
      </form>
    </div>
    
    </>
    
  );
};

export default RegistroSuministros;
