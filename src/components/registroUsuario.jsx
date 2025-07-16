import React, { useEffect, useState } from 'react';
import axios from 'axios';
import customAxios from '../helpers/customAxios';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [municipalidades, setMunicipalidades] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    numero: '',
    rol: '',
    activo: '',
    municipalidad: '',
    identificacion: ''
  });

  useEffect(() => {
    const fetchMunicipalidades = async () => {
      try {
        const res = await customAxios.get('https://apiintegrador-production-8ef8.up.railway.app/api/municipalidad/all');
        const data = Array.isArray(res.data) ? res.data
                  : res.data.municipalidades ?? res.data.data ?? [];
        setMunicipalidades(data || []);
      } catch (error) {
        console.error('Error al cargar municipalidades:', error);
        setMunicipalidades([]);
      }
    };
    fetchMunicipalidades();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { nombre, correo, contrasena, rol, activo, municipalidad, identificacion } = form;
    if (!nombre || !correo || !contrasena || !rol || !municipalidad || !identificacion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const payload = {
      nombreUsuario: nombre.trim(),
      correo: correo.trim(),
      contrasenaHash: contrasena.trim(),
      rol: rol.trim(),
      activo: activo.trim() === 'activo',
      idMunicipalidad: parseInt(municipalidad),
      identificacion: identificacion.trim()
    };

    try {
      await customAxios.post("https://apiintegrador-production-8ef8.up.railway.app/api/usuarios", payload);
      alert("Usuario registrado correctamente.");
      setForm({
        nombre: '', correo: '', contrasena: '', numero: '',
        rol: '', activo: '', municipalidad: '', identificacion: ''
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        alert("Error del servidor: " + JSON.stringify(error.response.data));
      } else {
        alert("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="container main-content">
      <h2>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)' }}
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Registro de Usuario
      </h2>

      <form onSubmit={handleSubmit}>
        <details open>
          <summary><strong>Información del Usuario</strong></summary>
          <fieldset className="mt-2">
            <label>Nombre Completo:</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />

            <label>Correo Electrónico:</label>
            <input name="correo" value={form.correo} type="email" onChange={handleChange} required />

            <label>Contraseña:</label>
            <input name="contrasena" value={form.contrasena} type="password" onChange={handleChange} required />

            <label>Número de Teléfono:</label>
            <input name="numero" value={form.numero} type="tel" pattern="[0-9]{4}-[0-9]{4}" onChange={handleChange} required />

            <label>Rol:</label>
            <select name="rol" value={form.rol} onChange={handleChange} required>
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
              <option value="viewer">Visualizador</option>
            </select>

            <label>Estado:</label>
            <select name="activo" value={form.activo} onChange={handleChange} required>
              <option value="">Seleccione un estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>

            <label>Municipalidad:</label>
            <select name="municipalidad" value={form.municipalidad} onChange={handleChange} required>
              <option value="">Seleccione municipalidad</option>
              {municipalidades.map((m) => (
                <option key={m.id || m.ID} value={m.id || m.ID}>
                  {m.nombre || m.Nombre || 'Sin nombre'}
                </option>
              ))}
            </select>

            <label>Identificación:</label>
            <input name="identificacion" value={form.identificacion} onChange={handleChange} required />
          </fieldset>
        </details>
        <button type="submit" className="btn btn-primary mt-3">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;