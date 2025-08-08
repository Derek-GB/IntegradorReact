import { useState, useEffect } from "react";
import { pedidoConsumiblesAPI } from "../../helpers/api.js";
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { useNavigate } from "react-router-dom";


const useResumenFinal = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await pedidoConsumiblesAPI.getAll();

      if (Array.isArray(data)) {
        const mapeado = data.map(item => ({
          id: item.id,
          seccion: "Pedido",
          tipo: item.tipoComida || "",
          unidad: "personas",
          cantidad: item.cantidadPersonas || 0,
          fecha: item.fechaCreacion || "-",
          albergue: `Albergue #${item.idAlbergue}`,
          idAlbergue: item.idAlbergue,
          idUsuarioCreacion: item.idUsuarioCreacion,
        }));

        setItems(mapeado);
      } else {
        setItems([]);
      }
    } catch (err) {
      setError(err.message);
      showCustomToast(`Error al cargar pedidos: ${err.message}`, "error");
    }
  };

  const validarPedido = (pedido) => {
    if (!pedido.tipo || typeof pedido.tipo !== 'string' || pedido.tipo.trim() === "") {
      return "El campo 'tipoComida' es obligatorio y debe ser un texto válido.";
    }
    if (!pedido.cantidad || isNaN(pedido.cantidad) || Number(pedido.cantidad) <= 0) {
      return "El campo 'cantidadPersonas' es obligatorio y debe ser mayor que cero.";
    }
    if (!pedido.idAlbergue || isNaN(pedido.idAlbergue) || Number(pedido.idAlbergue) <= 0) {
      return "El campo 'idAlbergue' es obligatorio y debe ser un número válido.";
    }
    if (!pedido.idUsuarioCreacion || isNaN(pedido.idUsuarioCreacion) || Number(pedido.idUsuarioCreacion) <= 0) {
      return "El campo 'idUsuarioCreacion' es obligatorio y debe ser un número válido.";
    }
    return null;
  };

  const editarItem = async (index, nuevoItem) => {
    try {
      const id = items[index]?.id;
      if (!id) throw new Error("ID inválido para editar");

      const errorValidacion = validarPedido(nuevoItem);
      if (errorValidacion) {
        showCustomToast(errorValidacion, "error");
        return;
      }

      const payload = {
        tipoComida: nuevoItem.tipo.trim(),
        cantidadPersonas: Number(nuevoItem.cantidad),
        idAlbergue: Number(nuevoItem.idAlbergue),
        idUsuarioCreacion: Number(nuevoItem.idUsuarioCreacion),
      };

      await pedidoConsumiblesAPI.update(id, payload);
      showCustomToast("Pedido actualizado exitosamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast(`Error al actualizar pedido: ${err.message}`, "error");
    }
  };

  const eliminarItem = async (index) => {
    try {
      const id = items[index]?.id;
      if (!id) throw new Error("ID inválido para eliminar");

      await pedidoConsumiblesAPI.remove(id);
      showCustomToast("Pedido eliminado exitosamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast(`Error al eliminar pedido: ${err.message}`, "error");
    }
  };

  // Puedes mantener esta función, pero NO la usarás en el componente
  const guardarPedidosDesdeFormulario = async () => {
    if (!items.length) {
      showCustomToast("No hay pedidos para guardar.", "error");
      return;
    }

    try {
      for (const pedido of items) {
        const errorValidacion = validarPedido(pedido);
        if (errorValidacion) {
          showCustomToast(`Error en pedido: ${errorValidacion}`, "error");
          return;
        }

        const payload = {
          tipoComida: pedido.tipo.trim(),
          cantidadPersonas: Number(pedido.cantidad),
          idAlbergue: Number(pedido.idAlbergue),
          idUsuarioCreacion: Number(pedido.idUsuarioCreacion),
        };

        if (pedido.id) {
          await pedidoConsumiblesAPI.update(pedido.id, payload);
        } else {
          await pedidoConsumiblesAPI.create(payload);
        }
      }

      showCustomToast("Pedidos guardados correctamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast(`Error al guardar pedidos: ${err.message}`, "error");
    }
  };

  const agrupados = Array.isArray(items)
    ? items.reduce((acc, item) => {
        if (!acc[item.seccion]) acc[item.seccion] = [];
        acc[item.seccion].push(item);
        return acc;
      }, {})
    : {};

  const descargarResumen = () => {
    if (!items.length) {
      showCustomToast("No hay datos para descargar.", 'error');
      return;
    }

    const encabezado = `"Sección","Tipo","Unidad","Cantidad"`;
    const cuerpo = items
      .map(i => `"${i.seccion}","${i.tipo}","${i.unidad}","${i.cantidad}"`)
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
    agrupados,
    error,
    descargarResumen,
    eliminarItem,
    editarItem,
    // NO exportamos guardarPedidosDesdeFormulario para evitar confusión,
    // pero si quieres mantenerla exportada, está aquí:
    guardarPedidosDesdeFormulario,
    navigate,
    obtenerPedidosConsumibles,
    crearPedidoConsumible,
    actualizarPedidoConsumible,
    eliminarPedidoConsumible,
  };
};

export default useResumenFinal;
