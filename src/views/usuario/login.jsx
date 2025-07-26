import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authHelper from '../../helpers/sesion';
import Alerta from '../../components/Alerta';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#00897B]">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#00897B] text-white font-semibold hover:bg-[#00796B] transition"
          >
            Ingresar
          </button>
          <div className="text-center mt-2">
            <Link to="/recuperarContrasena.jsx" className="text-[#00897B] hover:underline text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
        {mostrarAlerta && error && (
          <div className="mt-4">
            <Alerta
              mensaje={error}
              tipo="error"
              duracion={4000}
              onClose={() => setMostrarAlerta(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;