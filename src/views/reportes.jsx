import React from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import ExportExcelButton from "../components/otros/ExportExcelButton.jsx";
import ExportPdfButton from "../components/otros/ExportPdfButton.jsx";

import { useReportesAlbergue } from "../hooks/useReportes.js";

const ReportesAlbergue = () => {
  const {
    opcionesReporte,
    reporteSeleccionado,
    parametros,
    resultados,
    loading,
    handleReporteChange,
    handleChange,
    handleSubmit,
    buildColumns,
  } = useReportesAlbergue();

  const columns = buildColumns();
  const exportHeaders = columns.map(c => ({ label: c.name, key: c.key }));

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

        {reporteSeleccionado?.campos.map((campo) => (
          <InputField
            key={campo.name}
            label={campo.label}
            name={campo.name}
            value={parametros[campo.name] || ""}
            onChange={handleChange}
            placeholder={`Ingrese ${campo.label.toLowerCase()}`}
          />
        ))}

        <SubmitButton width="w-full" loading={loading}>
          Generar Reporte
        </SubmitButton>

        {resultados.length > 0 && (
          <>
            <div className="mt-6">
              <GlobalDataTable columns={columns} data={resultados} rowsPerPage={10} />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <ExportExcelButton
                data={resultados}
                headers={exportHeaders}
                fileName={`${reporteSeleccionado?.value || "reporte"}.xlsx`}
                className="px-4 py-2 text-sm w-auto"
              />
              <ExportPdfButton
                data={resultados}
                headers={exportHeaders}
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
