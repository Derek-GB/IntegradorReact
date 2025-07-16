import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const recuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo) {
      setError("Por favor ingrese su correo.");
      return;
    }

    try {
      await emailjs.send(
        'service_5medvrr', 
        'template_kqlpbcf', 
        {
          email: correo,
          link_recuperacion: `https://localhost:5175/restablecerContrasena?correo=${encodeURIComponent(correo)}`
        },
        'LBs6r9_55Anzo8Cm_' 
      );

      setMensaje("Correo enviado. Revisa tu bandeja.");
      setError('');
      setCorreo('');
    } catch (err) {
      console.error("Error al enviar correo:", err);
      setError("No se pudo enviar el correo. Intenta más tarde.");
      setMensaje('');
    }
  };

  useEffect(() => {
    if (mensaje) alert(mensaje);
    if (error) alert(error);
  }, [mensaje, error]);

  return (
    <div className="login-wrapper">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} className="login">
        {mensaje && <div className="success">{mensaje}</div>}
        {error && <div className="error">{error}</div>}

        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Ingrese su correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Enviar Instrucciones</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default recuperarContrasena;
