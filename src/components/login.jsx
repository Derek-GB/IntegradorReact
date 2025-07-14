import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/formulario.css'; // Asegúrate de tener este archivo con tus estilos
import authHelper from '../helpers/sesion'; // Asegúrate de importar correctamente tu helper
import { Link } from 'react-router-dom';

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
      setError("Por favor complete todos los campos");
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

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="login-wrapper">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="login">
        {error && <div className="error">{error}</div>}

        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Ingrese su usuario"
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
        <div className="recuperar-contrasena">
        <Link to="/recuperarContrasena.jsx">¿Olvidaste tu contraseña?</Link> 
      </div>
      </form>
    </div>
  );
};

export default Login;
