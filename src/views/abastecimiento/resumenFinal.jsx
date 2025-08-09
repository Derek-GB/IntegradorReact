import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable.jsx";
import useResumenFinal from "../../hooks/abastecimineto/useResumenFinal.js";
import CustomToaster from "../../components/globalComponents/CustomToaster.jsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ResumenFinal = () => {
  const {
    items,
    pedidos,
    datosFormulario,
    descargarResumen,
    eliminarItem,
    editarItem,
  } = useResumenFinal();

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editCantidad, setEditCantidad] = useState("");

  const handleOpenModal = (index) => {
    setEditIndex(index);
    setEditCantidad(pedidos[index].cantidad);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditIndex(null);
    setEditCantidad("");
  };

  const handleGuardarEdicion = () => {
    const nuevoItem = { ...pedidos[editIndex], cantidad: editCantidad };
    editarItem(editIndex, nuevoItem);
    handleCloseModal();
  };

  // Columnas para datos del formulario actual
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
      selector: (row) => row.albergue?.nombre || row.albergue,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">
          {row.albergue?.nombre || row.albergue || "-"}
        </span>
      ),
    },
  ];

  // Columnas para productos del formulario actual
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

  // Columnas para pedidos de la API
  const pedidosColumns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.fecha}</span>,
    },
    {
      name: "Tipo de Comida",
      selector: (row) => row.tipo,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.tipo}</span>,
    },
    {
      name: "Cantidad de Personas",
      selector: (row) => row.cantidad,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.cantidad}</span>,
    },
    {
      name: "Albergue",
      selector: (row) => row.albergue,
      sortable: true,
      cell: (row) => <span className="font-medium">{row.albergue}</span>,
    },
    {
      name: "Acciones",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(index)}
            className="text-black hover:text-yellow-600"
            title="Editar"
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            onClick={() => eliminarItem(index)}
            className="text-black hover:text-red-600"
            title="Eliminar"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      ),
    },
  ];

  // Preparar datos del formulario actual para mostrar
  const datosFormularioData = datosFormulario ? [datosFormulario] : [];

  return (
    <div className="space-y-6">
      <CustomToaster />

      {/* Datos del Formulario Actual */}
      {datosFormulario && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">
              Datos del Formulario Actual
            </h2>
          </div>
          <div className="p-4">
            <GlobalDataTable
              columns={datosFormularioColumns}
              data={datosFormularioData}
              pagination={false}
              noDataComponent={
                <div className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay datos del formulario actual
                </div>
              }
            />
          </div>
        </div>
      )}

      {/* Productos del Formulario Actual */}
      {items && items.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">
              Productos del Formulario Actual
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
                  No hay productos en el formulario actual
                </div>
              }
            />
          </div>
        </div>
      )}

      {/* Pedidos Guardados (de la API) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Pedidos Guardados</h2>
        </div>
        <div className="p-4">
          <GlobalDataTable
            columns={pedidosColumns}
            data={pedidos}
            pagination={true}
            paginationPerPage={10}
            noDataComponent={
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No hay pedidos guardados
              </div>
            }
          />
        </div>
      </div>

      {/* Botón de Descarga */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={descargarResumen}
          className="bg-yellow-500 text-black px-8 py-2 rounded-md hover:bg-yellow-600 transition flex items-center gap-2"
          title="Descargar resumen completo"
        >
          <DownloadIcon sx={{ fontSize: 20, color: "black" }} />
          Descargar Resumen Completo
        </button>
      </div>

      {/* Modal de Edición */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            padding: "24px",
            borderRadius: "5px",
          },
        }}
      >
        <DialogTitle
          sx={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}
        >
          Editar Cantidad del Pedido
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Cantidad"
            value={editCantidad}
            onChange={(e) => setEditCantidad(e.target.value)}
            type="number"
            fullWidth
            autoFocus
            InputLabelProps={{ style: { whiteSpace: "nowrap" } }}
            inputProps={{ min: 0, step: "any" }}
            sx={{ fontSize: "1.2rem", mb: 2 }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <button
            onClick={handleCloseModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGuardarEdicion}
            className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Guardar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResumenFinal;
