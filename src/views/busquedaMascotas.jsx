import React from "react";
import { useBusquedaMascotas } from "../hooks/useBusquedaMascotas";
import FormContainer from "../components/FormComponents/FormContainer";
import InputField from "../components/FormComponents/InputField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import CustomToaster from "../components/globalComponents/CustomToaster";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable";

const BuscarMascotas = () => {
  const {
    codigoFamilia,
    setCodigoFamilia,
    resultados,
    loading,
    handleSubmit
  } = useBusquedaMascotas();

  const columns = [
    { name: "Código Familia", selector: row => row.codigoFamilia },
    { name: "Nombre Mascota", selector: row => row.nombreMascota },
    { name: "Tipo", selector: row => row.tipo },
    { name: "Tamaño", selector: row => row.tamaño },
  ];

  return (
    <>
      <FormContainer title="Búsqueda de Mascotas" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Código Familia"
              name="codigoFamilia"
              value={codigoFamilia}
              onChange={(e) => setCodigoFamilia(e.target.value)}
              placeholder="Ej: 2025-AL-Zarcero-022"
              required
            />
          </div>

          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading} color="text-black">
              Buscar Mascotas
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
            noDataComponent={
              <div className="p-4 text-center text-gray-500">
                {loading ? "Buscando..." : "No se encontraron mascotas"}
              </div>
            }
          />
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
};

export default BuscarMascotas;