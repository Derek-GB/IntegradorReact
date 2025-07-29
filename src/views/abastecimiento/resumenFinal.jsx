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
    datosFormularioColumns,
    productosColumns,
    datosFormularioData,
  } = useResumenFinal();

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
