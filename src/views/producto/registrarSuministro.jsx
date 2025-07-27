import React, { useState, useEffect } from 'react';
import { productosAPI } from '../../helpers/api.js';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToast, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

const categorias = [
  { id: 1, nombre: "Carne" },
  { id: 2, nombre: "Proteina" },
  { id: 3, nombre: "Verdura" },
  { id: 4, nombre: "Reperte" },
  { id: 5, nombre: "Olores" },
  { id: 6, nombre: "Abarrotes" },
  { id: 7, nombre: "Limpieza" },
  { id: 8, nombre: "Mobiliario" },
];

const unidades = [
  { id: 1, nombre: "Mililitros" },
  { id: 2, nombre: "Gramos" },
  { id: 3, nombre: "Unidades" },
];

const RegistrarSuministro = () => {
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
      showCustomToast("Exito","Producto registrado correctamente", "success");
      setError('');
      setForm({
        codigo: '',
        descripcion: '',
        categoria: '',
        producto: '',
        unidad: '',
        cantidad: ''
      });
    } catch (err) {
      showCustomToast("Error", "Hubo un error al registrar el producto. Intente de nuevo.", "error");
      setMensaje('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <FormContainer
      title="Registrar Suministros"
      onSubmit={handleSubmit}
      size="md"
    >
      {mostrarAlertaMensaje && (
        <Alerta
          mensaje={mensaje}
          tipo="exito"
          duracion={4000}
          onClose={() => setMostrarAlertaMensaje(false)}
        />
      )}
      {mostrarAlertaError && (
        <Alerta
          mensaje={error}
          tipo="error"
          duracion={4000}
          onClose={() => setMostrarAlertaError(false)}
        />
      )}

      <fieldset className="w-full">
        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <div className="flex-1">
            <InputField
              label="Código de Producto"
              name="codigo"
              value={form.codigo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6 gap-4 mt-4">
          <div className="flex-1">
            
             <InputField
              label="Nombre del Producto"
              name="producto"
              value={form.producto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
           
              <InputField
              label="Cantidad"
              name="cantidad"
              type="number"
              min="0"
              value={form.cantidad}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6 gap-4 mt-4">
          <div className="flex-1">
           
            <SelectField
              label="Categoría"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              options={categorias}
              optionLabel="nombre"
              optionValue="id"
              required
            />
          </div>
          <div className="flex-1">
          <SelectField
              label="Unidad"
              name="unidad"
              value={form.unidad}
              onChange={handleChange}
              options={unidades}
              optionLabel="nombre"
              optionValue="id"
              required
            />
          </div>
        </div>
      </fieldset>
      <div className="flex justify-center mt-8">
        <SubmitButton width="w-full" color='text-black' loading={loading}>
          Agregar
        </SubmitButton>
      </div>
    </FormContainer>
    <CustomToast/>
   </div>
  );
};

export default RegistrarSuministro;