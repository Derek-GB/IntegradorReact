import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/formulario.css'; // Asegúrate de tener este archivo con tus estilos
import authHelper from '../helpers/sesion'; // Asegúrate de importar correctamente tu helper

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError("Por favor complete todos los campos");
      return;
    }

    try {
      authHelper.logout(); // Asegúrate de cerrar sesión antes de iniciar una nueva sesión
      await authHelper.login(usuario, contrasena); // Llama a la función de login
      setError(""); // Limpia el error si la autenticación es exitosa

      // Redirige a la página de inicio después de iniciar sesión
      navigate("/inicio"); // Cambia a la ruta de inicio
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Verifica tus credenciales." + "\n" + error.message); // Manejo de errores
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
