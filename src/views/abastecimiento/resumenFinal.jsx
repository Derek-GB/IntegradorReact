import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import useResumenFinal from "../../hooks/abastecimineto/useResumenFinal.js";

const ResumenFinal = () => {
  const {
    items,
    guardarDatos,
    descargarResumen,
    datosFormulario,
  } = useResumenFinal();

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

  return (
    <div className="space-y-6">
      {/* Sección Datos del Formulario */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Datos del Formulario
          </h2>
        </div>
        <div className="p-4">
          <GlobalDataTable
            columns={datosFormularioColumns}
            data={datosFormularioData}
            pagination={false}
            noDataComponent={
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No hay datos del formulario disponibles
              </div>
            }
          />
        </div>
      </div>

      {/* Sección Productos Registrados */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Productos Registrados
          </h2>
        </div>
        <div className="p-4">
          <GlobalDataTable
            columns={productosColumns}
            data={items}
            pagination={true}
            paginationPerPage={10}
            noDataComponent={
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No hay productos registrados
              </div>
            }
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <SubmitButton
          type="button"
          onClick={guardarDatos}
          width="flex-1 sm:max-w-xs"
          className="bg-yellow-500"
        >
          <div className="flex items-center justify-center gap-2">
            <SaveIcon sx={{ fontSize: 20 }} />
          </div>
        </SubmitButton>

        <SubmitButton
          type="button"
          onClick={descargarResumen}
          width="flex-1 sm:max-w-xs"
          className="bg-yellow-500"
        >
          <div className="flex items-center justify-center gap-2">
            <DownloadIcon sx={{ fontSize: 20 }} />
          </div>
        </SubmitButton>
      </div>
    </div>
  );
};

export default ResumenFinal;
