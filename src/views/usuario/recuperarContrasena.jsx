import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecuperarContrasena from '../../hooks/Usuario/useRecuperarContrasena.js';
import Alerta from '../../components/Alerta.jsx';

const RecuperarContrasena = () => {
  const navigate = useNavigate();
  const {
    correo,
    setCorreo,
    pin,
    setPin,
    nuevaContrasena,
    setNuevaContrasena,
    confirmarContrasena,
    setConfirmarContrasena,
    correoValido,
    mensaje,
    error,
    mostrarAlertaMensaje,
    mostrarAlertaError,
    handleSubmit,
    validarCorreo,
    setMostrarAlertaMensaje,
    setMostrarAlertaError,
  } = useRecuperarContrasena();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#00897B]">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {mostrarAlertaMensaje && mensaje && (
            <Alerta
              mensaje={mensaje}
              tipo="exito"
              duracion={4000}
              onClose={() => setMostrarAlertaMensaje(false)}
            />
          )}
          {mostrarAlertaError && error && (
            <Alerta
              mensaje={error}
              tipo="error"
              duracion={4000}
              onClose={() => setMostrarAlertaError(false)}
            />
          )}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
            <button
              type="button"
              onClick={validarCorreo}
              className="w-full mt-2 py-2 rounded-lg bg-[#00897B] text-white font-semibold hover:bg-[#00796B] transition"
            >
              Validar Correo
            </button>
          </div>
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
              PIN de Restablecimiento
            </label>
            <input
              type="text"
              id="pin"
              name="pin"
              placeholder="Ingrese el PIN (revisar correo electrónico)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              disabled={!correoValido}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
          </div>
          <div>
            <label htmlFor="nuevaContrasena" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="nuevaContrasena"
              name="nuevaContrasena"
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              disabled={!correoValido}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
          </div>
          <div>
            <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              placeholder="Confirme la contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              disabled={!correoValido}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00897B] transition"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#00897B] text-white font-semibold hover:bg-[#00796B] transition"
              disabled={!correoValido}
            >
              Restablecer Contraseña
            </button>
            <button
              type="button"
              className="w-full py-2 rounded-lg bg-gray-200 text-[#00897B] font-semibold hover:bg-gray-300 transition"
              onClick={() => navigate('/')}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
