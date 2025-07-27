import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHelper from '../helpers/sesion';

export const useLogin = () => {
  const [form, setForm] = useState({
    usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Verifica si hay un token válido
  const verificarToken = () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  };

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Valida el formulario
  const validarFormulario = () => {
    if (!form.usuario.trim() || !form.contrasena.trim()) {
      setError("Por favor complete todos los campos");
      setMostrarAlerta(true);
      return false;
    }
    return true;
  };

  // Maneja errores de autenticación
  const manejarError = (error) => {
    let mensajeError = 'Error al iniciar sesión. Verifica tus credenciales.';
    
    if (error.response?.status === 401) {
      mensajeError = 'Usuario o contraseña incorrecta';
    } else if (error.message?.toLowerCase().includes("unauthorized")) {
      mensajeError = 'No autorizado. Verifica tus credenciales.';
    } else if (error.message) {
      mensajeError = error.message;
    }

    setError(mensajeError);
    setMostrarAlerta(true);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setIsLoading(true);

    try {
      await authHelper.login(form.usuario, form.contrasena);

      if (verificarToken()) {
        setError('');
        setMostrarAlerta(false);
        navigate('/inicio');
      } else {
        setError('Inicio de sesión fallido. Token no generado.');
        setMostrarAlerta(true);
      }
    } catch (error) {
      manejarError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    error,
    mostrarAlerta,
    isLoading,
    handleChange,
    handleSubmit,
    setMostrarAlerta
  };
};