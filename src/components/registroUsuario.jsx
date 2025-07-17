import React, { useEffect, useState } from 'react';
import { municipalidadAPI, usuariosAPI } from '../helpers/api';
import '../styles/registroUsuario.css'; 

const RegistroUsuario = () => {
  const [municipalidades, setMunicipalidades] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol: '',
    activo: '',
    municipalidad: '',
    identificacion: ''
  });

  useEffect(() => {
    const fetchMunicipalidades = async () => {
      try {
        const data = await municipalidadAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setMunicipalidades(lista || []);
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

    if (!nombre || !correo || !contrasena || !rol || !activo || !municipalidad || !identificacion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const payload = {
      nombreUsuario: nombre.trim(),
      correo: correo.trim(),
      contrasenaHash: contrasena.trim(),
      rol: rol.trim(),
      activo: activo === "activo",
      idMunicipalidad: parseInt(municipalidad),
      identificacion: identificacion.trim()
    };

    try {
      await usuariosAPI.create(payload);
      alert("Usuario registrado correctamente.");
      setForm({
        nombre: '', correo: '', contrasena: '',
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
    <div className="ajuste-inventario-fullscreen sin-flecha-back">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <label>Nombre Completo:</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Correo Electrónico:</label>
        <input name="correo" type="email" value={form.correo} onChange={handleChange} required />

        <label>Contraseña:</label>
        <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} required />

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

        <button type="submit" className="">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
