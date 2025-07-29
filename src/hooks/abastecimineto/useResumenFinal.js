import { useContext } from "react";
import { contextoAbastecimiento } from "../../context/contextoAbastecimiento";
import { useNavigate } from "react-router-dom";

const useResumenFinal = () => {
  const { items, datosFormulario } = useContext(contextoAbastecimiento);
  const navigate = useNavigate();

  const agrupados = items.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  const guardarDatos = () => {
    alert("Datos guardados exitosamente.");
  };

  const descargarResumen = () => {
    const texto = items
      .map((i) => `${i.seccion},${i.tipo},${i.unidad},${i.cantidad}`)
      .join("\n");
    const blob = new Blob([texto], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumen_abastecimiento.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Configuración de columnas para datos del formulario
  const datosFormularioColumns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.fecha || "-"}</span>,
    },
    {
      name: "Tipo de Comida",
      selector: (row) => row.tipo,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.tipo || "-"}</span>,
    },
    {
      name: "Cantidad de Personas",
      selector: (row) => row.cantidad,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.cantidad || "-"}</span>,
    },
    {
      name: "Nombre del Albergue",
      selector: (row) => row.albergue,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.albergue || "-"}</span>,
    },
  ];

  // Configuración de columnas para productos
  const productosColumns = [
    {
      name: "Categoría",
      selector: (row) => row.seccion,
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded-full text-sm">
          {row.seccion}
        </span>
      ),
    },
    {
      name: "Producto",
      selector: (row) => row.tipo,
      sortable: true,
      cell: (row) => (
        <span className="font-medium text-gray-900">{row.tipo}</span>
      ),
    },
    {
      name: "Unidad",
      selector: (row) => row.unidad,
      sortable: true,
      cell: (row) => <span className="text-gray-600">{row.unidad}</span>,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-900">{row.cantidad}</span>
      ),
    },
  ];

  // Datos del formulario para la tabla
  const datosFormularioData = [datosFormulario || {}];

  return {
    items,
    datosFormulario,
    agrupados,
    guardarDatos,
    descargarResumen,
    datosFormularioColumns,
    productosColumns,
    datosFormularioData,
    navigate,
  };
};

export default useResumenFinal;