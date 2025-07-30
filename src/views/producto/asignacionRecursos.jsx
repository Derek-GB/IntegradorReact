import React from 'react';
import { useAsignarRecurso } from '../../hooks/Producto/useAsignarRecurso.js';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SearchAutocompleteInput from '../../components/FormComponents/SearchAutocompleteInput.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster from '../../components/globalComponents/CustomToaster.jsx'; // Ajusta ruta si hace falta

const AsignarRecurso = () => {
  const {
    personasFiltradas,
    productos,
    form,
    loading,
    busquedaPersona,
    showSugerenciasPersona,
    setShowSugerenciasPersona,
    setBusquedaPersona,
    handleChange,
    handleSelectPersona,
    handleSubmit
  } = useAsignarRecurso();

  return (
    <>
      <CustomToaster />
      <FormContainer title="Asignación de Recursos" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <SearchAutocompleteInput
              label="Persona (Identificación)"
              busqueda={busquedaPersona}
              setBusqueda={setBusquedaPersona}
              showSugerencias={showSugerenciasPersona}
              setShowSugerencias={setShowSugerenciasPersona}
              resultados={personasFiltradas}
              onSelect={handleSelectPersona}
              optionLabelKeys={["numeroIdentificacion", "nombre", "apellido"]}
              placeholder="Buscar por identificación o nombre..."
              disabled={loading}
            />
          </div>

          <div className="lg:col-span-1">
            <SelectField
              label="Producto"
              name="idProducto"
              value={form.idProducto}
              onChange={handleChange}
              options={productos.map(p => ({
                id: p.id,
                nombre: p.nombre || `Producto ${p.id}`
              }))}
              optionLabel="nombre"
              optionValue="id"
              required
              disabled={loading}
            />
          </div>

          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-[#00897B] mb-2">
              Cantidad
            </label>
            <input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              min="1"
              required
              disabled={loading}
              className="w-full p-3 border border-[#00897B] rounded-lg text-[#00897B] bg-white focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/30"
              placeholder="Ingrese la cantidad"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <SubmitButton
            loading={loading}
            className="px-8 py-3"
            color='text-black'
          >
            {loading ? 'Asignando...' : 'Asignar Recurso'}
          </SubmitButton>
        </div>
      </FormContainer>
    </>
  );
};

export default AsignarRecurso;
