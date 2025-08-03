import React, { useState } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";

const opcionesReporte = [
  {
    label: "Resumen de personas por albergue, por sexo, por edad",
    value: "personas_por_albergue",
    campos: [
      { label: "Código del albergue", name: "idAlbergue" },
      { label: "Sexo", name: "sexo" },
      { label: "Edad", name: "edad" }
    ]
  },
  {
    label: "Resumen de personas con discapacidad",
    value: "personas_discapacidad",
    campos: [
      { label: "Código del albergue", name: "idAlbergue" }
    ]
  },
  {
    label: "Resumen de condiciones especiales",
    value: "condiciones_especiales_jefe",
    campos: [
      { label: "Código del albergue", name: "idAlbergue" }
    ]
  },
  {
    label: "Resumen de suministros en albergues",
    value: "suministros_albergue",
    campos: [
      { label: "Código del albergue", name: "idAlbergue" }
    ]
  },
  {
    label: "Resumen de albergues por color de alerta",
    value: "albergues_por_color",
    campos: [
      { label: "Color del albergue", name: "color" }
    ]
  }
];

const ReportesAlbergue = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [parametros, setParametros] = useState({});

  const handleReporteChange = (e) => {
    const selected = opcionesReporte.find(o => o.value === e.target.value);
    setReporteSeleccionado(selected);
    setParametros({});
  };

  const handleChange = (e) => {
    setParametros(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reporte solicitado:", reporteSeleccionado.value);
    console.log("Parámetros:", parametros);
    // Aquí se conectará con la API cuando esté disponible
  };

  return (
    <FormContainer title="Generación de Reportes" onSubmit={handleSubmit} size="md">
      <div className="flex flex-col gap-4">
        <SelectField
          label="Seleccione un tipo de reporte"
          name="reporte"
          value={reporteSeleccionado?.value || ""}
          onChange={handleReporteChange}
          options={opcionesReporte.map(o => ({ nombre: o.label, value: o.value }))}
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

        <SubmitButton width="w-full">Generar Reporte</SubmitButton>
      </div>
    </FormContainer>
  );
};

export default ReportesAlbergue;