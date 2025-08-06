import useBusquedaFamiliaExtendida from "../../hooks/familia/useBusquedaFamiliaExtendida.js";
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
    albergues,
    familiasPorAlbergue,
    albergueSeleccionado,
    familiaSeleccionada,
    vistaActual,
    loadingAlbergues,
    loadingFamilias,
    handleSubmit,
    handleSeleccionarAlbergue,
    handleSeleccionarFamilia,
    irAAlbergues,
    volverABusqueda,
    volverAFamilias,
  } = useBusquedaFamiliaExtendida();

  // Vista de búsqueda principal (mantiene el diseño original)
  const renderVistaBusqueda = () => (
    <FormContainer
      title="Buscar Familia"
      onSubmit={handleSubmit}
      size="xs"
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Número de Identificación"
          name="identificacion"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Ingrese el número de identificación"
          required
        />
        <div className="flex flex-col md:flex-row gap-4">
          <SubmitButton color="text-black" width="flex-1" loading={loading}>
            Buscar
          </SubmitButton>
          <button
            type="button"
            onClick={irAAlbergues}
            className="flex-1 bg-[#00897B] text-white py-2 px-4 rounded-md hover:bg-[#00695C] transition-colors"
          >
            Ver por Albergue
          </button>
        </div>
      </div>
    </FormContainer>
  );

  // Vista de lista de albergues
  const renderVistaAlbergues = () => (
    <FormContainer title="Seleccionar Albergue" size="lg">
      <div className="mb-4">
        <button
          onClick={volverABusqueda}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
        >
          ← Volver a Búsqueda
        </button>
      </div>
      
      {loadingAlbergues ? (
        <div className="text-center py-8">Cargando albergues...</div>
      ) : (
        <GlobalDataTable
          columns={[
            { name: "#", selector: (row, i) => i + 1, width: "60px", sortable: false },
            { name: "Nombre", selector: row => row.nombre || "", sortable: true },
            { name: "Región", selector: row => row.region || "", sortable: true },
            { name: "Provincia", selector: row => row.provincia || "", sortable: true },
            { name: "Cantón", selector: row => row.canton || "", sortable: true },
            { name: "Distrito", selector: row => row.distrito || "", sortable: true },
            { name: "Capacidad", selector: row => row.capacidad || "", sortable: true },
            { name: "Condición", selector: row => row.condicionAlbergue || "", sortable: true },
            {
              name: "Acciones",
              cell: (row) => (
                <button
                  onClick={() => handleSeleccionarAlbergue(row)}
                  className="bg-[#FFC107] text-black py-1 px-3 rounded-md hover:bg-[#FFB300] transition-colors text-sm font-medium"
                >
                  Ver Familias
                </button>
              ),
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
          data={albergues}
          pagination
          rowsPerPage={10}
          highlightOnHover
          dense
        />
      )}
    </FormContainer>
  );

  // Vista de familias por albergue
  const renderVistaFamilias = () => (
    <FormContainer title={`Familias en ${albergueSeleccionado?.nombre}`} size="lg">
      <div className="mb-4 flex gap-4">
        <button
          onClick={volverABusqueda}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
        >
          ← Volver a Búsqueda
        </button>
        <button
          onClick={irAAlbergues}
          className="bg-[#00897B] text-white py-2 px-4 rounded-md hover:bg-[#00695C] transition-colors"
        >
          ← Volver a Albergues
        </button>
      </div>

      {loadingFamilias ? (
        <div className="text-center py-8">Cargando familias...</div>
      ) : familiasPorAlbergue.length > 0 ? (
        <GlobalDataTable
          columns={[
            { name: "#", selector: (row, i) => i + 1, width: "60px", sortable: false },
            { name: "Código Familia", selector: row => row.codigoFamilia || "", sortable: true },
            { name: "Jefe de Familia", selector: row => row.nombreJefe || "", sortable: true },
            { name: "Cantidad Personas", selector: row => row.cantidadPersonas || "", sortable: true },
            {
              name: "Acciones",
              cell: (row) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSeleccionarFamilia(row)}
                    className="bg-[#FFC107] text-black py-1 px-3 rounded-md hover:bg-[#FFB300] transition-colors text-sm font-medium"
                  >
                    Ver Detalles
                  </button>
                </div>
              ),
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
          data={familiasPorAlbergue}
          pagination
          rowsPerPage={10}
          highlightOnHover
          dense
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No hay familias registradas en este albergue.
        </div>
      )}
    </FormContainer>
  );

  // Vista de detalles de familia (mantiene el diseño original)
  const renderVistaDetalle = () => {
    const familiaData = familia || familiaSeleccionada;
    if (!familiaData || familiaData.length === 0) return null;

    return (
      <FormContainer 
        title="Buscar Familia"
        onSubmit={(e) => e.preventDefault()}
        size={familiaData?.length > 0 ? "md" : "xs"}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <button
                onClick={volverABusqueda}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Nueva Búsqueda
              </button>
              {familiaSeleccionada && (
                <button
                  onClick={volverAFamilias}
                  className="flex-1 bg-[#00897B] text-white py-2 px-4 rounded-md hover:bg-[#00695C] transition-colors"
                >
                  ← Volver a Familias
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Información General */}
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-bold text-[#00897B] mb-4">Detalles de la Familia</h2>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
            <InputField label="Código de Familia" value={familiaData[0].codigoFamilia || ""} readOnly />
            <InputField label="Jefe de Familia" value={familiaData[0].nombreCompletoJefe || ""} readOnly />
            <InputField
              label="Ubicación"
              value={`${familiaData[0].provincia || ""}, ${familiaData[0].canton || ""}, ${familiaData[0].distrito || ""}`}
              readOnly
            />
            <InputField label="Dirección Exacta" value={familiaData[0].direccionExacta || ""} readOnly />
            <InputField label="Albergue" value={familiaData[0].nombreAlbergue || ""} readOnly />
            <InputField label="N° Personas" value={familiaData.length} readOnly />
          </div>
        </div>

        {/* Tabla de miembros */}
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
            data={familiaData}
            pagination
            rowsPerPage={10}
            highlightOnHover
            dense
          />
        </div>
      </FormContainer>
    );
  };

  // Renderizar vista según el estado actual
  const renderVistaActual = () => {
    switch (vistaActual) {
      case 'albergues':
        return renderVistaAlbergues();
      case 'familias':
        return renderVistaFamilias();
      case 'detalle':
        return renderVistaDetalle();
      default:
        return renderVistaBusqueda();
    }
  };

  return (
    <>
      {renderVistaActual()}
      <CustomToaster />
    </>
  );
};

export default BusquedaFamilia;
