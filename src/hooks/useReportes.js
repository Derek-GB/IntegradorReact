import { useState } from "react";
import { toast } from "react-hot-toast";
import { personasAPI, inventarioAPI, alberguesAPI } from "../helpers/api";

const opcionesReporte = [
    { label: "Resumen de personas por albergue", value: "personas_por_albergue", campos: [{ label: "Código del albergue", name: "idAlbergue" }] },
    { label: "Resumen de personas por sexo", value: "personas_por_sexo", campos: [{ label: "Sexo", name: "sexo" }] },
    { label: "Resumen de personas por edad", value: "personas_por_edad", campos: [{ label: "Edad", name: "edad" }] },
    { label: "Resumen de personas con discapacidad", value: "personas_discapacidad", campos: [{ label: "Código del albergue", name: "id" }] },
    { label: "Resumen de suministros en albergues", value: "suministros_albergue", campos: [{ label: "Código del albergue", name: "idAlbergue" }] },
    { label: "Resumen de albergues por color de alerta", value: "albergues_por_color", campos: [{ label: "Color del albergue", name: "color" }] },
];

export function useReportesAlbergue() {
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [parametros, setParametros] = useState({});
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);

    // Helpers (puedes extraer a otro archivo si quieres)
    const safeParse = (value) => {
        let parsed = value;
        for (let i = 0; i < 3; i++) {
            if (typeof parsed === "string") {
                try { parsed = JSON.parse(parsed); } catch { break; }
            } else break;
        }
        return parsed;
    };

    const hasAnyKey = (obj, keys) => {
        if (!obj || typeof obj !== "object") return false;
        return keys.some(k => Object.prototype.hasOwnProperty.call(obj, k));
    };

    const formatMaybeDate = (value) => {
        if (!value && value !== 0) return "";
        if (typeof value === "number") {
            const d = new Date(value);
            if (!isNaN(d)) return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
        }
        if (typeof value === "string") {
            const d = new Date(value);
            if (!isNaN(d)) return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
            return value;
        }
        return String(value);
    };

    const normalizeSupplyItem = (raw) => {
        let obj = safeParse(raw) || {};
        if (Array.isArray(obj)) {
            const found = obj.find(el => typeof el === "object" && el !== null);
            obj = found || obj[0] || {};
        }

        const keys = {
            fecha: ['fecha', 'Fecha', 'date', 'createdAt', 'fecha_ingreso', 'fechaIngreso', 'fechaRegistro'],
            articulo: ['articulo', 'Articulo', 'artículo', 'nombre', 'producto', 'nombreArticulo', 'detalle', 'descripcion'],
            cantidad: ['cantidad', 'Cantidad', 'qty', 'cantidadDisponible', 'stock', 'cantidad_total'],
            estado: ['estado', 'Estado', 'status', 'estadoArticulo', 'estado_suministro'],
            comentario: ['comentario', 'Comentario', 'observacion', 'observaciones', 'nota', 'notas', 'detalle'],
            codigoAlbergue: ['codigoAlbergue', 'codigo_albergue', 'codigo', 'idAlbergue', 'id_albergue', 'codigoAlbergue', 'id']
        };

        const allPossible = Object.values(keys).flat();
        if (!hasAnyKey(obj, allPossible)) {
            for (const k in obj) {
                if (typeof obj[k] === "object" && obj[k] !== null && hasAnyKey(obj[k], allPossible)) {
                    obj = obj[k];
                    break;
                }
            }
        }

        const get = (o, names) => {
            if (!o || typeof o !== "object") return "";
            for (const n of names) {
                if (o[n] !== undefined && o[n] !== null) return o[n];
            }
            return "";
        };

        return {
            fecha: formatMaybeDate(get(obj, keys.fecha)),
            articulo: get(obj, keys.articulo) || "",
            cantidad: get(obj, keys.cantidad) !== "" ? get(obj, keys.cantidad) : "",
            estado: get(obj, keys.estado) || "",
            comentario: get(obj, keys.comentario) || "",
            codigoAlbergue: get(obj, keys.codigoAlbergue) || ""
        };
    };

    // Handlers
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
        if (!reporteSeleccionado) {
            toast.error("Seleccione un tipo de reporte");
            return;
        }
        setLoading(true);
        setResultados([]);

        try {
            switch (reporteSeleccionado.value) {
                case "personas_por_albergue": {
                    const idAlbergue = parametros.idAlbergue?.trim();
                    if (!idAlbergue) {
                        toast.error("Debe completar el campo: Código del albergue");
                        break;
                    }
                    const resumen = await personasAPI.getResumenPorAlbergue(idAlbergue);
                    setResultados(resumen.data ? (Array.isArray(resumen.data) ? resumen.data : [resumen.data]) : []);
                    break;
                }
                case "personas_por_sexo": {
                    const sexo = parametros.sexo?.trim();
                    if (!sexo) {
                        toast.error("Debe completar el campo: Sexo");
                        break;
                    }
                    const resumenSexo = await personasAPI.getResumenPorSexo(sexo);
                    setResultados(resumenSexo.data ? (Array.isArray(resumenSexo.data) ? resumenSexo.data : [resumenSexo.data]) : []);
                    break;
                }
                case "personas_por_edad": {
                    const edad = parametros.edad?.trim();
                    if (!edad) {
                        toast.error("Debe completar el campo: Edad");
                        break;
                    }
                    const resumenEdad = await personasAPI.getResumenPorEdad(edad);
                    setResultados(resumenEdad.data ? (Array.isArray(resumenEdad.data) ? resumenEdad.data : [resumenEdad.data]) : []);
                    break;
                }
                case "personas_discapacidad": {
                    const { id } = parametros;
                    if (!id || id.trim() === "") {
                        toast.error("Debe completar el campo: ID Persona");
                        break;
                    }
                    const discapacidad = await personasAPI.getPorDiscapacidad(id);
                    setResultados(Array.isArray(discapacidad.data) ? discapacidad.data : [discapacidad.data || discapacidad]);
                    break;
                }
                case "condiciones_especiales_jefe": {
                    const { idAlbergue } = parametros;
                    if (!idAlbergue || idAlbergue.trim() === "") {
                        toast.error("Debe completar el campo: Código del albergue");
                        break;
                    }
                    try {
                        const data = await personasAPI.getResumenPorCondiciones(idAlbergue);
                        setResultados(Array.isArray(data.data) ? data.data : [data.data || data]);
                    } catch (error) {
                        console.error(error);
                        toast.error("Error al obtener resumen de condiciones especiales");
                    }
                    break;
                }
                case "suministros_albergue": {
                    const { idAlbergue } = parametros;
                    if (!idAlbergue || idAlbergue.trim() === "") {
                        toast.error("Debe completar el campo: Código del albergue");
                        break;
                    }
                    try {
                        const response = await inventarioAPI.getSuministrosPorId(idAlbergue.trim());
                        let data = response?.data;
                        if (typeof data === "string") {
                            try {
                                data = JSON.parse(data);
                            } catch (error) {
                                console.error("Error al parsear los datos JSON de suministros:", error);
                                toast.error("Los datos recibidos no tienen un formato válido");
                                data = []; 
                            }
                        }
                        let items = [];
                        if (Array.isArray(data)) {
                            items = data.flatMap(item => (item ? [normalizeSupplyItem(item)] : []));
                        } else if (data && typeof data === "object") {
                            items = [normalizeSupplyItem(data)];
                        }
                        if (!items.length) {
                            toast("No se encontraron suministros para ese albergue");
                        }
                        setResultados(items);
                    } catch (error) {
                        console.error("Error al obtener suministros:", error);
                        toast.error("Error al obtener resumen de suministros");
                    }
                    break;
                }
                case "albergues_por_color": {
                    let { color } = parametros;
                    color = color?.trim().toLowerCase();
                    if (!color) {
                        toast.error("Debe completar el campo: Color del albergue");
                        break;
                    }
                    try {
                        const porColor = await alberguesAPI.getByColor(color);
                        setResultados(Array.isArray(porColor.data) ? porColor.data : []);
                    } catch (error) {
                        console.error("Error generando reporte por color:", error);
                        toast.error("Error al generar reporte por color");
                    }
                    break;
                }
                default:
                    toast.error("Tipo de reporte no reconocido");
            }
        } catch (error) {
            console.error("Error generando reporte:", error);
            toast.error("Error generando reporte");
        } finally {
            setLoading(false);
        }
    };

    // Columnas para tabla
    const buildColumns = () => {
        if (reporteSeleccionado?.value === "suministros_albergue") {
            return [
                { name: "Fecha", selector: (row) => row.fecha || "", key: "fecha", sortable: true },
                { name: "Artículo", selector: (row) => row.articulo || "", key: "articulo", sortable: true },
                { name: "Cantidad", selector: (row) => row.cantidad ?? "", key: "cantidad", sortable: true },
                { name: "Estado", selector: (row) => row.estado || "", key: "estado", sortable: true },
                { name: "Comentario", selector: (row) => row.comentario || "", key: "comentario", sortable: true },
                { name: "Código Albergue", selector: (row) => row.codigoAlbergue || "", key: "codigoAlbergue", sortable: true },
            ];
        }
        if (!resultados || resultados.length === 0) return [];
        const sample = resultados[0] || {};
        return Object.keys(sample).map((key) => ({
            name: key,
            key: key,
            selector: (row) => {
                const val = row[key];
                if (val === null || val === undefined) return "";
                if (typeof val === "object") {
                    return val?.nombre || (Array.isArray(val) ? val.join(", ") : JSON.stringify(val));
                }
                return String(val);
            },
            sortable: true,
        }));
    };

    return {
        opcionesReporte,
        reporteSeleccionado,
        setReporteSeleccionado,
        parametros,
        setParametros,
        resultados,
        loading,
        handleReporteChange,
        handleChange,
        handleSubmit,
        buildColumns,
    };
}
