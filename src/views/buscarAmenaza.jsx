import React, { useEffect } from "react";
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
    setResultados,
  } = useBusquedaAmenazas();

  const columns = [
    { name: "Familia Evento", selector: (row) => row.familiaEvento },
    { name: "Evento", selector: (row) => row.evento },
    { name: "Peligro", selector: (row) => row.peligro },
    { name: "Causa", selector: (row) => row.Causa },
    { name: "Categoría Evento", selector: (row) => row.CategoriaEvento },
  ];

  // Mostrar todas las amenazas al cargar el componente
  useEffect(() => {
    setResultados(amenazas);
  }, [amenazas, setResultados]);

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

        <div className="mt-8">
          <GlobalDataTable
            columns={columns}
            data={resultados}
            loading={loading}
            rowsPerPage={5}
            pagination
          />
        </div>
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default BuscarAmenaza;