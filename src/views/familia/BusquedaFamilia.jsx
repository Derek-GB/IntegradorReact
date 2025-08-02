
import useBusquedaFamilia from "../../hooks/familia/useBusquedaFamilia.js";
import FormContainer from "../../components/FormComponents/FormContainer";
import InputField from "../../components/FormComponents/InputField";
import SubmitButton from "../../components/FormComponents/SubmitButton";
import CustomToaster from "../../components/globalComponents/CustomToaster";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable";

const BusquedaFamilia = () => {
  const {
    identificacion,
    setIdentificacion,
    familia,
    loading,
    handleSubmit,
  } = useBusquedaFamilia();

  return (
    <FormContainer
      title="Buscar Familia"
      onSubmit={handleSubmit}
      size={familia?.length > 0 ? "md" : "xs"}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <InputField
            label="Número de Identificación"
            name="identificacion"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            placeholder="Ingrese el número de identificación"
            required
          />
          <div className="mt-4">
            <SubmitButton color="text-black" width="w-full" loading={loading}>
              Buscar
            </SubmitButton>
          </div>
        </div>
      </div>

      {familia?.length > 0 && (
        <>
          <div className="mt-8 mb-4">
            <h2 className="text-xl font-bold text-[#00897B] mb-4">Detalles de la Familia</h2>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
              <InputField label="Código de Familia" value={familia[0].codigoFamilia || ""} readOnly />
              <InputField label="Jefe de Familia" value={familia[0].nombreCompletoJefe || ""} readOnly />
              <InputField
                label="Ubicación"
                value={`${familia[0].provincia || ""}, ${familia[0].canton || ""}, ${familia[0].distrito || ""}`}
                readOnly
              />
              <InputField label="Dirección Exacta" value={familia[0].direccionExacta || ""} readOnly />
              <InputField label="Albergue" value={familia[0].nombreAlbergue || ""} readOnly />
              <InputField label="N° Personas" value={familia.length} readOnly />
            </div>
          </div>

          <div className="mt-4">
            <GlobalDataTable
              columns={[
                { name: "#", selector: (row, i) => i + 1, width: "60px", sortable: false },
                { name: "Nombre Completo", selector: row => row.nombreCompletoIntegrante || "", sortable: true },
                { name: "Tipo Identificación", selector: row => row.tipoIdentificacion || "", sortable: true },
                { name: "Número Identificación", selector: row => row.numeroIdentificacion || "", sortable: true },
                { name: "Fecha Nacimiento", selector: row => row.fechaNacimiento?.split("T")[0] || "", sortable: true },
                { name: "Nacionalidad", selector: row => row.nacionalidad || "", sortable: true },
                { name: "Parentesco", selector: row => row.parentesco || "", sortable: true },
                { name: "Sexo", selector: row => row.sexo || "", sortable: true },
                { name: "Género", selector: row => row.genero || "", sortable: true },
                { name: "Condición de Salud", selector: row => row.tieneCondicionSalud === 1 ? "Sí" : "No", sortable: true },
                { name: "Discapacidad", selector: row => row.discapacidad === 1 ? "Sí" : "No", sortable: true },
                { name: "Tipo Discapacidad", selector: row => row.discapacidad === 1 ? row.tipoDiscapacidad || "" : "-", sortable: true },
                { name: "Subtipo Discapacidad", selector: row => row.discapacidad === 1 ? row.subtipoDiscapacidad || "" : "-", sortable: true },
                { name: "Tipo Condición Poblacional", selector: row => row.tipoCondicionPoblacional || "", sortable: true },
                { name: "Contacto de Emergencia", selector: row => row.contactoEmergencia || "", sortable: true },
              ]}
              data={familia}
              pagination
              rowsPerPage={10}
              highlightOnHover
              dense
            />
          </div>
        </>
      )}

      <CustomToaster />
    </FormContainer>
  );
};

export default BusquedaFamilia;
