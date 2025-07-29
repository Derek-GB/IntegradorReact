
import { useState, useEffect } from 'react';
import { usuariosAPI } from '../../helpers/api';
import axios from 'axios';

const useRecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [pin, setPin] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [correoValido, setCorreoValido] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlertaMensaje, setMostrarAlertaMensaje] = useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

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

  return {
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
    validarCorreo,
    handleSubmit,
    setMostrarAlertaMensaje,
    setMostrarAlertaError
  };
};

export default useRecuperarContrasena;
