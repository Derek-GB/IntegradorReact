import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/login.css';
import authHelper from '../../helpers/sesion';

import Alerta from '../../components/Alerta'; // <-- Importa el componente alerta

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false); // nuevo estado para mostrar alerta

  const navigate = useNavigate();

  const verificarToken = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError("Por favor complete todos los campos");
      setMostrarAlerta(true);
      return;
    }

    try {
      await authHelper.login(usuario, contrasena);

      if (verificarToken()) {
        setError('');
        setMostrarAlerta(false);
        navigate('/inicio');
      } else {
        setError('Inicio de sesión fallido. Token no generado.');
        setMostrarAlerta(true);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.message?.toLowerCase().includes("unauthorized")) {
        setError('Usuario o contraseña incorrecta');
      } else {
        setError(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }
      setMostrarAlerta(true);
    }
  };

  return (
    <>
      <div className="containerLogin">
        <div className="login-wrapper">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            {/* Eliminamos el div con clase error */}
            
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
            <br />
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Ingresar</button>
            </div>
            <br />

            <div>
              <Link to="/recuperarContrasena.jsx">¿Olvidaste tu contraseña?</Link>
            </div>
          </form>

          {/* Mostrar alerta si hay error y mostrarAlerta=true */}
          {mostrarAlerta && error && (
            <Alerta
              mensaje={error}
              tipo="error"
              duracion={4000}
              onClose={() => setMostrarAlerta(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
