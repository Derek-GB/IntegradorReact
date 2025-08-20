import React from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import SearchAutocompleteInput from "../components/FormComponents/SearchAutocompleteInput.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../components/globalComponents/CustomToaster.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import { useBusquedaAmenazas } from "../hooks/useBusquedaAmenazas.js";

const BuscarAmenaza = () => {
  const {
    amenazas,
    codigoAmenaza,
    setCodigoAmenaza,
    showSugerencias,
    setShowSugerencias,
    handleAmenazaSelect,
    resultados,
    loading,
    handleSubmit,
  } = useBusquedaAmenazas();

  const columns = [
    { name: "Código Amenaza", selector: (row) => row.codigoAmenaza || row.id },
    { name: "Tipo de Amenaza", selector: (row) => row.tipoAmenaza || row.tipo },
    { name: "Descripción", selector: (row) => row.descripcion },
    { name: "Nivel de Riesgo", selector: (row) => row.nivelRiesgo },
    { name: "Ubicación", selector: (row) => row.ubicacion },
  ];

  return (
    <>
      <FormContainer title="Búsqueda de Amenaza" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <SearchAutocompleteInput
              label="Código Amenaza"
              busqueda={codigoAmenaza}
              setBusqueda={setCodigoAmenaza}
              showSugerencias={showSugerencias}
              setShowSugerencias={setShowSugerencias}
              resultados={amenazas}
              onSelect={handleAmenazaSelect}
              optionLabelKeys={["codigoAmenaza", "id"]}
              placeholder="Seleccione un código de amenaza"
              disabled={loading || !(amenazas?.length > 0)}
            />
          </div>

          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading} color="text-black">
              Buscar
            </SubmitButton>
          </div>
        </div>

        {resultados.length > 0 && (
          <div className="mt-8">
            <GlobalDataTable
              columns={columns}
              data={resultados}
              loading={loading}
              rowsPerPage={5}
              pagination
            />
          </div>
        )}

        {resultados.length === 0 && !loading && (
          <p className="mt-6 text-center text-gray-500">
            Ingrese un código y presione Buscar para ver resultados.
          </p>
        )}
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default BuscarAmenaza;