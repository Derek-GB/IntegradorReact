import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosAPI } from '../helpers/api';
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta';
import '../styles/indexx.css';


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
    <>
      <div className="header">
        <h2>Registro de Productos</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>

      <div className="containerRegistroProducto mt-4">



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




        <label>Unidad:</label>
        <select name="unidad" value={form.unidad} onChange={handleChange} required>
          <option value="">Seleccione una unidad</option>
          <option value="1">Mililitros</option>
          <option value="2">Gramos</option>
          <option value="3">Unidades</option>
        </select>



    </div >
    </>



  );
};

export default RegistrarProducto;
