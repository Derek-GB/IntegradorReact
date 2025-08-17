import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import ExportExcelButton from "../components/otros/ExportExcelButton.jsx";
import ExportPdfButton from "../components/otros/ExportPdfButton.jsx";
import SearchAutocompleteInput from "../components/FormComponents/SearchAutocompleteInput.jsx";
import { useReportesAlbergue } from "../hooks/useReportes.js";
import { alberguesAPI } from "../helpers/api.js";

const ReportesAlbergue = () => {
  const {
    opcionesReporte,
    reporteSeleccionado,
    parametros,
    setParametros,
    resultados,
    loading,
    handleReporteChange,
    handleChange,
    handleSubmit,
    buildColumns,
  } = useReportesAlbergue();

  const columns = buildColumns();
  const exportHeaders = columns.map(c => ({ label: c.name, key: c.key }));

  // Estado para autocomplete de albergues
  const [albergues, setAlbergues] = useState([]);
  const [busquedaAlbergue, setBusquedaAlbergue] = useState('');
  const [showSugerenciasAlbergue, setShowSugerenciasAlbergue] = useState(false);

  // Cargar albergues solo si el reporte seleccionado es por albergue
  useEffect(() => {
    const cargarAlbergues = async () => {
      const idUsuario = localStorage.getItem("idUsuario");
      if (!idUsuario) {
        setAlbergues([]);
        return;
      }
      try {
        const res = await alberguesAPI.getByUsuario(idUsuario);
        const listaAlbergues = Array.isArray(res) ? res : res.data || [];
        setAlbergues(listaAlbergues);
      } catch {
        setAlbergues([]);
      }
    };
    if (reporteSeleccionado?.value === "personas_por_albergue") {
      cargarAlbergues();
    }
  }, [reporteSeleccionado]);

  // Sincronizar el texto visible si el nombreAlbergue cambia por otro medio
  useEffect(() => {
    if (parametros.nombreAlbergue) {
      const albergueSel = albergues.find(a => a.nombre === parametros.nombreAlbergue);
      if (albergueSel) {
        setBusquedaAlbergue(`${albergueSel.idAlbergue} - ${albergueSel.nombre}`);
      }
    } else {
      setBusquedaAlbergue('');
    }
  }, [parametros.nombreAlbergue, albergues]);

  // Handler para seleccionar albergue desde autocomplete
  const onSelectAlbergue = (albergue) => {
    setParametros(prev => ({
      ...prev,
      nombreAlbergue: albergue.nombre // <-- Guarda el nombre, no el id
    }));
    setBusquedaAlbergue(`${albergue.idAlbergue} - ${albergue.nombre}`);
    setShowSugerenciasAlbergue(false);
  };

  // Función para agregar datos generales del albergue a cada fila exportada
  function getExportData() {
    if (
      reporteSeleccionado?.value === "personas_por_albergue" &&
      resultados[0]
    ) {
      const { codigoAlbergue, nombreAlbergue } = resultados[0];
      return resultados.map(row => ({
        ...row,
        codigoAlbergue,
        nombreAlbergue,
      }));
    }
    return resultados;
  }

  // Ajusta los headers para incluir los campos generales si es necesario
  const exportHeadersWithAlbergue = [
    ...(reporteSeleccionado?.value === "personas_por_albergue"
      ? [
          { label: "Código Albergue", key: "codigoAlbergue" },
          { label: "Nombre Albergue", key: "nombreAlbergue" },
        ]
      : []),
    ...exportHeaders,
  ];

  return (
    <FormContainer title="Generación de Reportes" onSubmit={handleSubmit} size="md">
      <div className="flex flex-col gap-4">
        <SelectField
          label="Seleccione un tipo de reporte"
          name="reporte"
          value={reporteSeleccionado?.value || ""}
          onChange={handleReporteChange}
          options={opcionesReporte.map((o) => ({ nombre: o.label, value: o.value }))}
          optionLabel="nombre"
          optionValue="value"
        />

        {/* Si el reporte es por albergue, usa el autocomplete */}
        {reporteSeleccionado?.value === "personas_por_albergue" ? (
          <SearchAutocompleteInput
            label="Seleccionar Albergue"
            busqueda={busquedaAlbergue}
            setBusqueda={setBusquedaAlbergue}
            showSugerencias={showSugerenciasAlbergue}
            setShowSugerencias={setShowSugerenciasAlbergue}
            resultados={albergues}
            onSelect={onSelectAlbergue}
            optionLabelKeys={["idAlbergue", "nombre"]}
            placeholder="Buscar albergue..."
            sx={{ width: '100%' }}
            disabled={loading}
          />
        ) : (
          reporteSeleccionado?.campos.map((campo) => (
            <InputField
              key={campo.name}
              label={campo.label}
              name={campo.name}
              value={parametros[campo.name] || ""}
              onChange={handleChange}
              placeholder={`Ingrese ${campo.label.toLowerCase()}`}
            />
          ))
        )}

        <SubmitButton width="w-full" loading={loading}>
          Generar Reporte
        </SubmitButton>

        {resultados.length > 0 && (
          <>
            {/* Mostrar datos generales del albergue arriba de la tabla */}
            {reporteSeleccionado?.value === "personas_por_albergue" && resultados[0] && (
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <InputField
                    label="Código Albergue"
                    value={resultados[0].codigoAlbergue || ""}
                    readOnly
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Nombre Albergue"
                    value={resultados[0].nombreAlbergue || ""}
                    readOnly
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <GlobalDataTable columns={columns} data={resultados} rowsPerPage={10} />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <ExportExcelButton
                data={getExportData()}
                headers={exportHeadersWithAlbergue}
                fileName={`${reporteSeleccionado?.value || "reporte"}.xlsx`}
                className="px-4 py-2 text-sm w-auto"
              />
              <ExportPdfButton
                data={getExportData()}
                headers={exportHeadersWithAlbergue}
                fileName={`${reporteSeleccionado?.value || "reporte"}.pdf`}
                title={reporteSeleccionado?.label || "Reporte"}
                className="px-4 py-2 text-sm w-auto"
              />
            </div>
          </>
        )}
      </div>
    </FormContainer>
  );
};

export default ReportesAlbergue;
