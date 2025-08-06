import React, { useState } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import { toast } from "react-hot-toast";

// APIs específicas
import {
  personasAPI,
  condicionesEspecialesAPI,
  inventarioAPI,
  alberguesAPI,
} from "../helpers/api";

const opcionesReporte = [
  {
    label: "Resumen de personas por albergue, por sexo, por edad",
    value: "personas_por_albergue",
    campos: [
      { label: "Código del albergue", name: "idAlbergue" },
      { label: "Sexo", name: "sexo" },
      { label: "Edad", name: "edad" },
    ],
  },
  {
    label: "Resumen de personas con discapacidad",
    value: "personas_discapacidad",
    campos: [{ label: "Código del albergue", name: "idAlbergue" }],
  },
  {
    label: "Resumen de condiciones especiales",
    value: "condiciones_especiales_jefe",
    campos: [{ label: "Código del albergue", name: "idAlbergue" }],
  },
  {
    label: "Resumen de suministros en albergues",
    value: "suministros_albergue",
    campos: [{ label: "Código del albergue", name: "idAlbergue" }],
  },
  {
    label: "Resumen de albergues por color de alerta",
    value: "albergues_por_color",
    campos: [{ label: "Color del albergue", name: "color" }],
  },
];

const ReportesAlbergue = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [parametros, setParametros] = useState({});
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReporteChange = (e) => {
    const selected = opcionesReporte.find((o) => o.value === e.target.value);
    setReporteSeleccionado(selected);
    setParametros({});
    setResultados([]);
  };

  const handleChange = (e) => {
    setParametros((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultados([]);

    try {
      for (const campo of reporteSeleccionado.campos) {
        if (!parametros[campo.name] || parametros[campo.name].trim() === "") {
          toast.error(`Debe completar el campo: ${campo.label}`);
          setLoading(false);
          return;
        }
      }

      switch (reporteSeleccionado.value) {
        case "personas_discapacidad": {
          const discapacidad = await personasAPI.getDiscapacidadPorAlbergue(parametros.idAlbergue);
          setResultados(discapacidad);
          break;
        }

        case "condiciones_especiales_jefe": {
          const condiciones = await condicionesEspecialesAPI.getResumenPorAlbergue(parametros.idAlbergue);
          setResultados(condiciones);
          break;
        }

        case "suministros_albergue": {
          const suministros = await inventarioAPI.getSuministrosPorAlbergue(parametros.idAlbergue);
          setResultados(suministros);
          break;
        }

        case "albergues_por_color": {
          const porColor = await alberguesAPI.getByColor(parametros.color);
          setResultados(porColor);
          break;
        }

        case "personas_por_albergue": {
          toast("Ruta aún no implementada");
          break;
        }

        default: {
          toast.error("Tipo de reporte no reconocido");
        }
      }
    } catch (error) {
      console.error("Error generando reporte:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="mt-6">
            <GlobalDataTable
              columns={Object.keys(resultados[0] || {}).map((key) => ({
                name: key,
                selector: (row) => row[key],
                sortable: true,
              }))}
              data={resultados}
              rowsPerPage={10}
            />
          </div>
        )}
      </div>
    </FormContainer>
  );
};

export default ReportesAlbergue;
