import React, { useState } from 'react';
import { useRegistroUsuario } from '../../hooks/Usuario/useRegistroUsuario.js';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SearchAutocompleteInput from '../../components/FormComponents/SearchAutocompleteInput.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster from '../../components/globalComponents/CustomToaster.jsx';

const RegistroUsuario = () => {
  const {
    municipalidades,
    form,
    roles,
    estados,
    handleChange,
    handleSubmit,
  } = useRegistroUsuario();

  // Estados para el componente de Autocomplete de municipalidad
  const [busquedaMunicipalidad, setBusquedaMunicipalidad] = useState('');
  const [showSugerenciasMunicipalidad, setShowSugerenciasMunicipalidad] = useState(false);

  return (
    <>
      <FormContainer
        title="Registro de Usuario"
        onSubmit={handleSubmit}
        size="md"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Nombre Completo"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1">
            <InputField
              label="Identificación"
              name="identificacion"
              value={form.identificacion}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Correo Electrónico"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Contraseña"
              name="contrasena"
              type="password"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <SearchAutocompleteInput
              label="Municipalidad"
              busqueda={busquedaMunicipalidad}
              setBusqueda={setBusquedaMunicipalidad}
              showSugerencias={showSugerenciasMunicipalidad}
              setShowSugerencias={setShowSugerenciasMunicipalidad}
              resultados={municipalidades}
              onSelect={(municipalidad) => {
                handleChange({
                  target: {
                    name: 'municipalidad',
                    value: municipalidad.id || municipalidad.ID,
                  },
                });
              }}
              optionLabelKeys={['nombre', 'Nombre']}
              placeholder="Buscar municipalidad..."
            />
          </div>

          <div className="flex-1">
            <SelectField
              label="Rol"
              name="rol"
              value={form.rol}
              onChange={handleChange}
              options={roles}
              optionLabel="nombre"
              optionValue="value"
              required
            />
          </div>

          <div className="flex-1">
            <SelectField
              label="Estado"
              name="activo"
              value={form.activo}
              onChange={handleChange}
              options={estados}
              optionLabel="nombre"
              optionValue="value"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full" color="twxt-black">
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default RegistroUsuario;
