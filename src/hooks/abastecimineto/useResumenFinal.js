import { useContext } from "react";
import { contextoAbastecimiento } from "../../context/contextoAbastecimiento";
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { useNavigate } from "react-router-dom";
import { pedidoConsumiblesAPI } from "../../helpers/api";

const useResumenFinal = () => {
  const { items, datosFormulario, eliminarItem, editarItem } = useContext(contextoAbastecimiento);
  const navigate = useNavigate();

  const agrupados = items.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  const descargarResumen = () => {
  if (items.length === 0) {
    showCustomToast("No hay datos para descargar.", 'error');
    return;
  }

  const encabezado = `"Sección","Tipo","Unidad","Cantidad"`;
  const cuerpo = items
    .map((i) => `"${i.seccion}","${i.tipo}","${i.unidad}","${i.cantidad}"`)
    .join("\n");

  const textoConBOM = '\uFEFF' + `${encabezado}\n${cuerpo}`;
  const blob = new Blob([textoConBOM], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resumen_abastecimiento.csv";
  a.click();
  URL.revokeObjectURL(url);

  showCustomToast("Descarga completada exitosamente.", "success");
};

  const obtenerPedidosConsumibles = async () => {
    try {
      const pedidos = await pedidoConsumiblesAPI.getAll();
      return pedidos;
    } catch (error) {
      showCustomToast("Error al obtener pedidos de consumibles.", "error");
    }
  };

  const crearPedidoConsumible = async (data) => {
    try {
      const nuevoPedido = await pedidoConsumiblesAPI.create(data);
      showCustomToast("Pedido creado exitosamente.", "success");
      return nuevoPedido;
    } catch (error) {
      showCustomToast("Error al crear pedido de consumibles.", "error");
    }
  };

  const actualizarPedidoConsumible = async (data) => {
    try {
      const pedidoActualizado = await pedidoConsumiblesAPI.update(data);
      showCustomToast("Pedido actualizado exitosamente.", "success");
      return pedidoActualizado;
    } catch (error) {
      showCustomToast("Error al actualizar pedido de consumibles.", "error");
    }
  };

  const eliminarPedidoConsumible = async (id) => {
    try {
      await pedidoConsumiblesAPI.remove(id);
      showCustomToast("Pedido eliminado exitosamente.", "success");
    } catch (error) {
      showCustomToast("Error al eliminar pedido de consumibles.", "error");
    }
  };

  return {
    items,
    datosFormulario,
    agrupados,
    descargarResumen,
    eliminarItem,
    editarItem,
    navigate,
    obtenerPedidosConsumibles,
    crearPedidoConsumible,
    actualizarPedidoConsumible,
    eliminarPedidoConsumible,
  };
};

export default useResumenFinal;
