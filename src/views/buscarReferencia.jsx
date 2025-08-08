
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../components/globalComponents/CustomToaster.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import { useBusquedaReferencia } from "../hooks/useBusquedaReferencia.js";

const BuscarReferencias = () => {
  const {
    codigoFamilia,
    setCodigoFamilia,
    resultados,
    loading,
    handleSubmit,
  } = useBusquedaReferencia();

  const columns = [
    { name: "Tipo de Ayuda", selector: row => row.tipoAyuda },
    { name: "Descripción", selector: row => row.descripcion },
    { name: "Fecha de Entrega", selector: row => row.fechaEntrega },
    { name: "Responsable", selector: row => row.responsable },
  ];

  return (
    <>
      <FormContainer title="Búsqueda de Referencia" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Código Familia"
              name="codigoFamilia"
              value={codigoFamilia}
              onChange={(e) => setCodigoFamilia(e.target.value)}
              placeholder="Ingrese el código de familia"
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

export default BuscarReferencias;
