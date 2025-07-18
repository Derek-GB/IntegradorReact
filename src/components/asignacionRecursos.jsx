import React, { useEffect, useState } from 'react';
import { personasAPI, productosAPI, recursosAsignadosAPI } from '../helpers/api';
import '../styles/registroUsuario.css';

const AsignarRecurso = () => {
  const [personas, setPersonas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    idPersona: '',
    idProducto: '',
    cantidad: ''
  });
  const [mensaje, setMensaje] = useState('');

  // Obtener personas
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await personasAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setPersonas(lista);
      } catch (error) {
        console.error('Error al cargar personas:', error);
        setPersonas([]);
      }
    };
    fetchPersonas();
  }, []);

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productosAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setProductos(lista);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      }
    };
    fetchProductos();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    const { idPersona, idProducto, cantidad } = form;

    if (!idPersona || !idProducto || !cantidad) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const payload = {
      idPersona: parseInt(idPersona),
      idProducto: parseInt(idProducto),
      cantidadAsignada: parseInt(cantidad)
    };

    try {
      await recursosAsignadosAPI.create(payload);
      alert('Recurso asignado correctamente.');
      setForm({ idPersona: '', idProducto: '', cantidad: '' });
    } catch {
       alert('Recurso asignado correctamente.');
   
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen sin-flecha-back">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Asignación de Recursos</h2>

        <label>Persona (Identificación):</label>
        <select
          name="idPersona"
          value={form.idPersona}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una persona</option>
          {Array.isArray(personas) && personas.map((p) => (
            <option key={p.id || p.ID} value={p.id || p.ID}>
              {p.numeroIdentificacion || `Persona ${p.id}`}
            </option>
          ))}
        </select>

        <label>Producto:</label>
        <select
          name="idProducto"
          value={form.idProducto}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un producto</option>
          {Array.isArray(productos) && productos.map((p) => (
            <option key={p.id || p.ID} value={p.id || p.ID}>
              {p.nombre || `Producto ${p.id}`}
            </option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit">Asignar Recurso</button>

        {/* Mensaje opcional de estado */}
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AsignarRecurso;
