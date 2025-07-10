import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formulario.css';
import authHelper from '../helpers/sesion';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const verificarToken = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      await authHelper.login(usuario, contrasena);

      if (verificarToken()) {
        setError('');
        navigate('/inicio');
      } else {
        setError('Inicio de sesión fallido. Token no generado.');
      }
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  // 🔴 Nueva función: cerrar sesión
  const handleLogout = () => {
    authHelper.logout(); // Elimina el token
    setUsuario('');
    setContrasena('');
    setError('Sesión cerrada.');
    navigate('/'); // Redirige a la raíz o login
  };

  return (
    <div className="login-wrapper">
      <h2>Iniciar Sesión</h2>
      {verificarToken() && (
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={handleLogout} className="btn btn-danger">
            Cerrar sesión
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="login">
        {error && <div className="error">{error}</div>}

        <label htmlFor="usuario">Usuario o correo</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Ingrese su usuario o correo"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          placeholder="Ingrese su contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
