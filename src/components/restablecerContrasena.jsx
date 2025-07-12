import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/formulario.css'; // Usa el mismo estilo que tu login
import authHelper from '../helpers/sesion'; // Asegúrate de tener esta función implementada


const restablecerContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Obtiene el correo desde los parámetros de la URL (?email=algo@dominio.com)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('correo');
    if (email) {
      setCorreo(email);
    } else {
      setError("Enlace inválido: falta el correo.");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevaContrasena || !confirmarContrasena) {
      setError("Por favor complete todos los campos");
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await authHelper.resetPassword(correo, nuevaContrasena);
      setError('');
      alert("Contraseña actualizada correctamente");
      navigate('/'); // Redirige al login u otra ruta
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setError("Error al cambiar contraseña: " + error.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="login-wrapper">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="login">
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={correo}
          readOnly
        />

        <label htmlFor="nuevaContrasena">Nueva Contraseña</label>
        <input
          type="password"
          id="nuevaContrasena"
          name="nuevaContrasena"
          placeholder="Ingrese la nueva contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          required
        />

        <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmarContrasena"
          name="confirmarContrasena"
          placeholder="Confirme la nueva contraseña"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          required
        />

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Restablecer</button>
        </div>
      </form>
    </div>
  );
};

export default restablecerContrasena;
