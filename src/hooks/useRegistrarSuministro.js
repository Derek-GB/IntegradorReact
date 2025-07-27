// src/hooks/useRegistrarSuministro.js
import { useState, useEffect } from 'react';
import { productosAPI } from '../helpers/api';
import { showCustomToast } from '../components/globalComponents/CustomToaster';

const useRegistrarSuministro = () => {
  const [form, setForm] = useState({
    codigo: '',
    descripcion: '',
    categoria: '',
    producto: '',
    unidad: '',
    cantidad: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mostrarAlertaMensaje, setMostrarAlertaMensaje] = useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mensaje) setMostrarAlertaMensaje(true);
  }, [mensaje]);

  useEffect(() => {
    if (error) setMostrarAlertaError(true);
  }, [error]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        codigoProducto: form.codigo,
        nombre: form.producto,
        descripcion: form.descripcion,
        cantidad: parseInt(form.cantidad),
        categoria: parseInt(form.categoria),
        unidadMedida: parseInt(form.unidad)
      };

      await productosAPI.create(data);
      showCustomToast("Exito", "Producto registrado correctamente", "success");
      setError('');
      setForm({
        codigo: '',
        descripcion: '',
        categoria: '',
        producto: '',
        unidad: '',
        cantidad: ''
      });
    } catch{
      showCustomToast("Error", "Hubo un error al registrar el producto. Intente de nuevo.", "error");
      setMensaje('');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    mensaje,
    error,
    mostrarAlertaMensaje,
    mostrarAlertaError,
    setMostrarAlertaMensaje,
    setMostrarAlertaError,
    loading
  };
};

export default useRegistrarSuministro;
