import React, { useState } from 'react';
import './formulario.css'; // Asegúrate de tener este archivo con tus estilos

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Aquí va tu lógica real de autenticación. Ejemplo:
    console.log('Usuario:', usuario);
    console.log('Contraseña:', contrasena);
    setError('');

    // Simulación de redirección (React Router o window.location)
    window.location.href = 'inicio.html';
  };

  return (
    <div className="login-wrapper">
      <h2>Iniciar Sesión</h2>
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

