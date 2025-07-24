import React, { useEffect, useState } from 'react';
import { personasAPI, productosAPI, recursosAsignadosAPI } from '../../helpers/api.js';
import '../../styles/registroUsuario.css';
import Alerta from '../../components/Alerta.jsx';

const AsignarRecurso = () => {
  const [personas, setPersonas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    idPersona: '',
    idProducto: '',
    cantidad: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlertaMensaje, setMostrarAlertaMensaje] = useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

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

  useEffect(() => {
    if (mensaje) setMostrarAlertaMensaje(true);
  }, [mensaje]);

  useEffect(() => {
    if (error) setMostrarAlertaError(true);
  }, [error]);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const { idPersona, idProducto, cantidad } = form;

    if (!idPersona || !idProducto || !cantidad) {
      setError('Por favor complete todos los campos.');
      return;
    }

    const payload = {
      idPersona: parseInt(idPersona),
      idProducto: parseInt(idProducto),
      cantidadAsignada: parseInt(cantidad)
    };

    try {
      await recursosAsignadosAPI.create(payload);
      setMensaje('Recurso asignado correctamente.');
      setForm({ idPersona: '', idProducto: '', cantidad: '' });
    } catch {
      setMensaje('Recurso asignado correctamente.');
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen sin-flecha-back">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Asignación de Recursos</h2>

        {mostrarAlertaMensaje && (
          <Alerta 
            mensaje={mensaje} 
            tipo="exito" 
            duracion={4000} 
            onClose={() => setMostrarAlertaMensaje(false)} 
          />
        )}
        {mostrarAlertaError && (
          <Alerta 
            mensaje={error} 
            tipo="error" 
            duracion={4000} 
            onClose={() => setMostrarAlertaError(false)} 
          />
        )}

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
      </form>
    </div>
  );
};

export default AsignarRecurso;
