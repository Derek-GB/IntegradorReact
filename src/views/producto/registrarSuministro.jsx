import React from 'react';
import useRegistrarSuministro from '../../hooks/Producto/useRegistrarSuministro.js';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToast from '../../components/globalComponents/CustomToaster.jsx';

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
  const {
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
  } = useRegistrarSuministro();

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
      <CustomToast />
    </div>
  );
};

export default RegistrarSuministro;
