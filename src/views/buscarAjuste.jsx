import React, { useEffect } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../components/globalComponents/CustomToaster.jsx";
import GlobalDataTable from "../components/globalComponents/GlobalDataTable.jsx";
import { useBusquedaAjuste } from "../hooks/useBusquedaAjuste.js";
import ExportPdfButton from "../components/otros/ExportPdfButton.jsx";  // <-- Importa aquí

const BuscarAjustesInventario = () => {
  const {
    nombreProducto,
    setNombreProducto,
    resultados,
    loading,
    handleSubmit,
  } = useBusquedaAjuste();

  useEffect(() => {
    console.log("Resultados:", resultados);
  }, [resultados]);

  const columns = [
    { name: "Producto", selector: row => row.nombreProducto },
    { name: "Cantidad Original", selector: row => row.cantidadOriginal },
    { name: "Cantidad Ajustada", selector: row => row.cantidadAjustada },
    { name: "Justificación", selector: row => row.justificacion },
    { name: "Fecha creacion", selector: row => row.fechaCreacion },
  ];

  // Headers para exportar, con label y key según columnas
 const exportHeaders = [
  { label: "Producto", key: "nombreProducto" },
  { label: "Cantidad Original", key: "cantidadOriginal" },
  { label: "Cantidad Ajustada", key: "cantidadAjustada" },
  { label: "Justificación", key: "justificacion" },
  { label: "Fecha creacion", key: "fechaCreacion" },
];

  return (
    <>
      <FormContainer title="Ajustes de Inventario" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Nombre del Producto"
              name="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              placeholder="Ingrese el nombre del producto"
            />
          </div>

          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading} color="text-black">
              Buscar
            </SubmitButton>
          </div>
        </div>

        {resultados.length > 0 && (
          <>
            <div className="mt-8">
              <GlobalDataTable
                columns={columns}
                data={resultados}
                loading={loading}
                rowsPerPage={5}
              />
            </div>

            {/* Botón Exportar PDF debajo de la tabla, centrado */}
            <div className="flex justify-center mt-4">
              <ExportPdfButton
                data={resultados}
                headers={exportHeaders}
                fileName="ajustes_inventario.pdf"
                title="Reporte de Ajustes de Inventario"
                className="px-4 py-2 text-sm w-auto"
              />
            </div>
          </>
        )}

        {resultados.length === 0 && !loading && (
          <p className="mt-6 text-center text-gray-500">
            Ingrese un nombre de producto y presione Buscar para ver los ajustes.
          </p>
        )}
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default BuscarAjustesInventario;
