import React, { useState } from 'react';
import { productosAPI } from '../helpers/api';
import '../styles/registroUsuario.css'; 


const RegistrarSuministro = () => {
  const [form, setForm] = useState({
    codigo: '',
    descripcion: '',
    categoria: '',
    producto: '',
    unidad: '',
    cantidad: ''
  });

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
        categoria: parseInt(form.categoria), 
        unidadMedida: parseInt(form.unidad)  
      };

      await productosAPI.create(data); 
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
  <div className="ajuste-inventario-fullscreen sin-flecha-back">
    <form onSubmit={handleSubmit} className="ajuste-inventario-form">
      <h2 className="text-center">Registrar Suministros</h2>
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

export default RegistrarSuministro;
