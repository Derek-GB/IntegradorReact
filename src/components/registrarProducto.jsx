import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosAPI } from '../helpers/api';
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta';


const RegistrarProducto = () => {
  const [form, setForm] = useState({
    codigo: '',
    descripcion: '',
    categoria: '',
    producto: '',
    unidad: '',
    cantidad: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = {
        codigoProducto: form.codigo,
        nombre: form.producto,
        descripcion: form.descripcion,
        cantidad: parseInt(form.cantidad),
        categoria: parseInt(form.categoria), // ✅ convertir a entero
        unidadMedida: parseInt(form.unidad)  // ✅ convertir a entero
      };

      await productosAPI.create(data); // ✅ usa el helper
      alert("Producto registrado correctamente");
      setForm({
        codigo: '',
        descripcion: '',
        categoria: '',
        producto: '',
        unidad: '',
        cantidad: ''
      });
    } catch (err) {
      console.error("Error al registrar producto:", err);
      alert("Hubo un error al registrar el producto. Intente de nuevo.");
    }
  };

  return (
    <div className="container main-content">
      <h2>
        <button
          onClick={() => navigate('/')}
          type="button"
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            right: '1cm',
            top: '50%',
            transform: 'translateY(-50%)',
            minWidth: '40px',
            padding: '8px'
          }}
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Registro de Productos
      </h2>

      <form onSubmit={handleSubmit} className="form-control">
        <details open>
          <summary><strong>Formulario de Registro</strong></summary>
          <fieldset className="mt-2">
            <label>Código de Producto:</label>
            <input name="codigo" value={form.codigo} onChange={handleChange} required />

            <label>Descripción:</label>
            <input name="descripcion" value={form.descripcion} onChange={handleChange} required />

            <label>Categoría:</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="">Seleccione una opción</option>
              <option value="1">Carne</option>
              <option value="2">Proteina</option>
              <option value="3">Verdura</option>
              <option value="4">Reperte</option>
              <option value="5">Olores</option>
              <option value="6">Abarrotes</option>
              <option value="7">Limpieza</option>
              <option value="8">Mobiliario</option>
            </select>

            <label>Nombre del Producto:</label>
            <input name="producto" value={form.producto} onChange={handleChange} required />

            <label>Unidad:</label>
            <select name="unidad" value={form.unidad} onChange={handleChange} required>
              <option value="">Seleccione una unidad</option>
              <option value="1">Mililitros</option>
              <option value="2">Gramos</option>
              <option value="3">Unidades</option>
            </select>

            <label>Cantidad:</label>
            <input name="cantidad" type="number" min="0" value={form.cantidad} onChange={handleChange} required />
          </fieldset>
        </details>
        <button type="submit" className="btn btn-primary mt-3">Agregar</button>
      </form>
    </div>
  );
};

export default RegistrarProducto;
