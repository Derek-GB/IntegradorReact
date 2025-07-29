import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable.jsx";
import GlobalModal from "../../components/globalComponents/GlobalModal.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import useResumenParcial from "../../hooks/abastecimineto/useResumenParcial.js";

const ResumenParcial = () => {
  const {
    items,
    isModalOpen,
    selectedProduct,
    editCantidad,
    setEditCantidad,
    cerrarModal,
    guardarEdicion,
    abrirModal,
    handleEliminar,
  } = useResumenParcial();

  // Configuración de columnas para la tabla
  const columns = [
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
    {
      name: "Acciones",
      cell: (row) => {
        const index = items.findIndex(
          (item) =>
            item.seccion === row.seccion &&
            item.tipo === row.tipo &&
            item.unidad === row.unidad &&
            item.cantidad === row.cantidad
        );

        return (
          <div className="flex gap-2">
            <button
              onClick={() => abrirModal(index)}
              className="  hover:text-black bg-blue-50 hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
              title="Editar producto"
            >
              <EditIcon sx={{ fontSize: 16, color: "black" }} />
            </button>
            <button
              onClick={() => eliminarItem(realIndex)}
              className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
              title="Eliminar item"
            >
              <DeleteIcon sx={{ fontSize: 18, color: "#dc2626" }} />
            </button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sección Principal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Resumen Parcial de Productos
          </h2>
        </div>
        <div className="p-4">
          <GlobalDataTable
            columns={columns}
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

      {/* Modal de Edición */}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        title="Editar Producto"
        size="md"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                {selectedProduct.tipo}
              </h3>
              <p className="text-gray-600">Unidad: {selectedProduct.unidad}</p>
              <p className="text-gray-600">
                Categoría: {selectedProduct.seccion}
              </p>
            </div>

            <div className="space-y-4">
              <InputField
                label="Cantidad"
                type="number"
                min="0"
                value={editCantidad}
                onChange={(e) => setEditCantidad(e.target.value)}
                placeholder="Ingrese la nueva cantidad"
              />

              <div className="flex gap-3 justify-end pt-4">
                <SubmitButton
                  type="button"
                  onClick={guardarEdicion}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <div className="flex items-center gap-2">
                    <SaveIcon sx={{ fontSize: 20 }} />
                    Guardar
                  </div>
                </SubmitButton>

                <SubmitButton
                  type="button"
                  onClick={cerrarModal}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <div className="flex items-center gap-2">
                    <CloseIcon sx={{ fontSize: 20 }} />
                    Cancelar
                  </div>
                </SubmitButton>
              </div>
            </div>
          </div>
        )}
      </GlobalModal>
    </div>
  );
};

export default ResumenParcial;
