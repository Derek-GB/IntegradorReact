import React, { useState } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SelectField from "../components/FormComponents/SelectField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import { toast } from "react-hot-toast";

import {
  personasAPI,
  condicionesEspecialesAPI,
  inventarioAPI,
  alberguesAPI,
} from "../helpers/api";

const opcionesReporte = [
  {
    label: "Resumen de personas por albergue",
    value: "personas_por_albergue",
    campos: [{ label: "Código del albergue", name: "idAlbergue" }],
  },
  {
    label: "Resumen de personas por sexo",
    value: "personas_por_sexo",
    campos: [{ label: "Sexo", name: "sexo" }],
  },
  {
    label: "Resumen de personas por edad",
    value: "personas_por_edad",
    campos: [{ label: "Edad", name: "edad" }],
  },
  {
    label: "Resumen de personas con discapacidad",
    value: "personas_discapacidad",
    campos: [{ label: "ID Persona", name: "id" }],
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
    console.log("Reporte seleccionado:", selected);
    setReporteSeleccionado(selected);
    setParametros({});
    setResultados([]);
  };

  const handleChange = (e) => {
    console.log(`Cambio en campo ${e.target.name}:`, e.target.value);
    setParametros((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultados([]);
    console.log("Generando reporte:", reporteSeleccionado?.value);
    console.log("Parámetros:", parametros);

    try {
      switch (reporteSeleccionado.value) {
        case "personas_por_albergue": {
          const idAlbergue = parametros.idAlbergue?.trim();
          if (!idAlbergue) {
            toast.error("Debe completar el campo: Código del albergue");
            setLoading(false);
            return;
          }
          const resumen = await personasAPI.getResumenPorAlbergue(idAlbergue);
          console.log("Respuesta API resumen por albergue:", resumen);
          setResultados(resumen.data ? [resumen.data] : []);
          break;
        }

        case "personas_por_sexo": {
          const sexo = parametros.sexo?.trim();
          if (!sexo) {
            toast.error("Debe completar el campo: Sexo");
            setLoading(false);
            return;
          }
          const resumenSexo = await personasAPI.getResumenPorSexo(sexo);
          console.log("Respuesta API resumen por sexo:", resumenSexo);
          setResultados(resumenSexo.data ? (Array.isArray(resumenSexo.data) ? resumenSexo.data : [resumenSexo.data]) : []);
          break;
        }

        case "personas_por_edad": {
          const edad = parametros.edad?.trim();
          if (!edad) {
            toast.error("Debe completar el campo: Edad");
            setLoading(false);
            return;
          }
          // Aquí usamos el nuevo método que usa el endpoint correcto
          const resumenEdad = await personasAPI.getResumenPorEdad(edad);
          console.log("Respuesta API resumen por edad:", resumenEdad);
          setResultados(resumenEdad.data ? (Array.isArray(resumenEdad.data) ? resumenEdad.data : [resumenEdad.data]) : []);
          break;
        }

        case "personas_discapacidad": {
          const { id } = parametros;
          if (!id || id.trim() === "") {
            toast.error("Debe completar el campo: ID Persona");
            setLoading(false);
            return;
          }
          const discapacidad = await personasAPI.getPorDiscapacidad(id);
          console.log("Respuesta API personas_discapacidad:", discapacidad);
          setResultados(Array.isArray(discapacidad) ? discapacidad : [discapacidad]);
          break;
        }

        case "condiciones_especiales_jefe": {
          const { idAlbergue } = parametros;
          if (!idAlbergue || idAlbergue.trim() === "") {
            toast.error("Debe completar el campo: Código del albergue");
            setLoading(false);
            return;
          }
          const data = await condicionesEspecialesAPI.getResumenPorAlbergue(idAlbergue);
          console.log("Respuesta API condiciones_especiales_jefe:", data);
          setResultados(data);
          break;
        }

        case "suministros_albergue": {
          const { idAlbergue } = parametros;
          if (!idAlbergue || idAlbergue.trim() === "") {
            toast.error("Debe completar el campo: Código del albergue");
            setLoading(false);
            return;
          }
          const suministros = await inventarioAPI.getSuministrosPorAlbergue(idAlbergue);
          console.log("Respuesta API suministros_albergue:", suministros);
          setResultados(suministros);
          break;
        }

        case "albergues_por_color": {
          let { color } = parametros;
          color = color?.trim().toLowerCase();

          if (!color) {
            toast.error("Debe completar el campo: Color del albergue");
            setLoading(false);
            return;
          }

          try {
            const porColor = await alberguesAPI.getByColor(color);
            console.log("Respuesta API albergues_por_color:", porColor);
            setResultados(Array.isArray(porColor.data) ? porColor.data : []);
          } catch (error) {
            console.error("Error generando reporte por color:", error);
            toast.error(error.message);
          }
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

  console.log("Resultados actuales:", resultados);

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
                selector: (row) => {
                  const val = row[key];
                  if (val === null || val === undefined) return "";
                  if (typeof val === "object") {
                    return val.nombre || JSON.stringify(val);
                  }
                  return val.toString();
                },
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
