import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosAPI } from '../../helpers/api.js';
import axios from 'axios';
import Alerta from '../../components/Alerta.jsx';

const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [pin, setPin] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [correoValido, setCorreoValido] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlertaMensaje, setMostrarAlertaMensaje] = useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (mensaje) setMostrarAlertaMensaje(true);
  }, [mensaje]);

  useEffect(() => {
    if (error) setMostrarAlertaError(true);
  }, [error]);

  const enviarPinConBrevo = async (correo, pin) => {
    const data = {
      to: [{ email: correo }],
      templateId: 1,
      params: { pin },
      headers: { "X-Mailin-custom": "recuperacion_contrasena" }
    };
    const keyParts = [
      'xkeysib-1bf96d0f0cd54ad6',
      '77d5cd85cdbfb327cfde',
      '6db10663b8d28586994d',
      '4d4abcbb-gDzvWqKnB7eLNfOQ'
    ];
    const apiKey = keyParts.join('');
    await axios.post('https://api.brevo.com/v3/smtp/email', data, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  };

  const validarCorreo = async () => {
    if (!correo) {
      setError("Por favor ingrese su correo.");
      setMostrarAlertaError(true);
      return;
    }
    try {
      const { existe } = await usuariosAPI.validarCorreo(correo);
      if (existe) {
        const pinInfo = JSON.parse(localStorage.getItem('pinInfo') || '{}');
        const ahora = Date.now();
        if (pinInfo.correo === correo && pinInfo.expira > ahora) {
          setMensaje("PIN ya enviado recientemente. Revisa tu correo.");
          setMostrarAlertaMensaje(true);
        } else {
          const nuevoPin = Math.floor(1000 + Math.random() * 9000).toString();
          const expira = ahora + 10 * 60 * 1000;
          localStorage.setItem('pinInfo', JSON.stringify({ pin: nuevoPin, expira, correo }));
          await enviarPinConBrevo(correo, nuevoPin);
          setMensaje("Correo verificado y PIN enviado.");
          setMostrarAlertaMensaje(true);
        }
        setCorreoValido(true);
        setError('');
        setMostrarAlertaError(false);
      } else {
        setCorreoValido(false);
        setError("El correo no está registrado.");
        setMostrarAlertaError(true);
        setMensaje('');
        setMostrarAlertaMensaje(false);
      }
    } catch (err) {
      setCorreoValido(false);
      setError(err.message || "Error al validar el correo.");
      setMostrarAlertaError(true);
      setMensaje('');
      setMostrarAlertaMensaje(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoValido) {
      setError("Debe validar el correo primero.");
      setMostrarAlertaError(true);
      return;
    }
    const pinInfo = JSON.parse(localStorage.getItem('pinInfo') || '{}');
    const ahora = Date.now();
    if (pinInfo.correo !== correo || pinInfo.pin !== pin || ahora > pinInfo.expira) {
      setError("El PIN es incorrecto o ha expirado. Por favor vuelva a validar su correo.");
      setMostrarAlertaError(true);
      return;
    }
    if (!nuevaContrasena || !confirmarContrasena) {
      setError("Debe completar ambos campos de contraseña.");
      setMostrarAlertaError(true);
      return;
    }
    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      setMostrarAlertaError(true);
      return;
    }
    try {
      await usuariosAPI.updateContrasena(correo, nuevaContrasena);
      setMensaje("Contraseña actualizada exitosamente.");
      setMostrarAlertaMensaje(true);
      setError('');
      setMostrarAlertaError(false);
      setCorreo('');
      setPin('');
      setNuevaContrasena('');
      setConfirmarContrasena('');
      setCorreoValido(false);
      localStorage.removeItem('pinInfo');
    } catch (err) {
      setError("No se pudo actualizar la contraseña. Intenta más tarde.");
      setMostrarAlertaError(true);
    }
  };

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