import React from "react";
import useRegistroMunicipalidad from "../hooks/useRegistroMunicipalidad.js";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../components/globalComponents/CustomToaster.jsx";

const RegistroMunicipalidad = () => {
  const {
    form,
    handleChange,
    loading,
    provincias,
    cantones,
    distritos,
    handleSubmit,
  } = useRegistroMunicipalidad();

  return (
    <>
      <FormContainer title="Registro de Municipalidad" onSubmit={handleSubmit} size="md">
        <fieldset className="w-full">
          {/* Nombre */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="Nombre de la Municipalidad"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </div>
          </div>

          {/* Teléfono y Correo */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <InputField
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ingrese el número de teléfono"
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Correo"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="Ingrese el correo"
                required
              />
            </div>
          </div>

          {/* Provincia, Cantón y Distrito */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <SelectField
                label="Provincia"
                name="provinciaSeleccionada"
                value={form.provinciaSeleccionada}
                onChange={handleChange}
                options={provincias}
                optionLabel="nombre"
                optionValue="id"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Cantón"
                name="cantonSeleccionado"
                value={form.cantonSeleccionado}
                onChange={handleChange}
                options={cantones}
                optionLabel="nombre"
                optionValue="id"
                required
                disabled={!cantones.length}
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Distrito"
                name="distritoSeleccionado"
                value={form.distritoSeleccionado}
                onChange={handleChange}
                options={distritos}
                optionLabel="nombre"
                optionValue="id"
                required
                disabled={!distritos.length}
              />
            </div>
          </div>

          {/* Dirección exacta */}
          <div className="flex flex-col gap-6 mt-4">
            <InputField
              label="Dirección Exacta"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ingrese la dirección exacta"
              required
            />
          </div>
        </fieldset>

        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full" loading={loading} color="text-black">
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
};

export default RegistroMunicipalidad;
