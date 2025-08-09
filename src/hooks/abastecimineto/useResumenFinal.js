import { useState, useEffect, useContext } from "react";
import { pedidoConsumiblesAPI, detallePedidoConsumiblesAPI } from "../../helpers/api.js";
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { useNavigate } from "react-router-dom";
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento.jsx';

const useResumenFinal = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { items, datosFormulario } = useContext(contextoAbastecimiento);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await pedidoConsumiblesAPI.getAll();
      console.log("📦 Datos recibidos de la API:", data);

      const procesar = (arr) =>
        arr.map(item => ({
          id: item.id,
          seccion: "Pedido",
          tipo: item.tipoComida || "",
          unidad: "personas",
          cantidad: item.cantidadPersonas || 0,
          fecha: item.fechaCreacion ? new Date(item.fechaCreacion).toLocaleDateString() : "-",
          albergue: `Albergue #${item.idAlbergue}`,
          idAlbergue: item.idAlbergue,
          idUsuarioCreacion: item.idUsuarioCreacion,
        }));

      if (data?.data && Array.isArray(data.data)) {
        setPedidos(procesar(data.data));
      } else if (Array.isArray(data)) {
        setPedidos(procesar(data));
      } else {
        setPedidos([]);
      }
    } catch (err) {
      console.error("❌ Error cargando pedidos:", err);
      setError(err.message);
      showCustomToast("Error", `Error al cargar pedidos: ${err.message}`, "error");
    }
  };

  const validarPedido = (pedido) => {
    if (!pedido.tipoComida || typeof pedido.tipoComida !== 'string' || pedido.tipoComida.trim() === "") {
      return "El campo 'tipoComida' es obligatorio y debe ser texto.";
    }
    if (!pedido.cantidadPersonas || isNaN(pedido.cantidadPersonas) || Number(pedido.cantidadPersonas) <= 0) {
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
      const id = pedidos[index]?.id;
      if (!id) throw new Error("ID inválido para editar");

      const payload = {
        tipoComida: nuevoItem.tipo?.trim(),
        cantidadPersonas: Number(nuevoItem.cantidad),
        idAlbergue: Number(nuevoItem.idAlbergue),
        idUsuarioCreacion: Number(nuevoItem.idUsuarioCreacion),
      };

      console.log("✏️ Editando pedido ID:", id, "con payload:", payload);

      const errorValidacion = validarPedido(payload);
      if (errorValidacion) {
        showCustomToast("Error", errorValidacion, "error");
        return;
      }

      await pedidoConsumiblesAPI.update(id, payload);
      showCustomToast("Éxito", "Pedido actualizado exitosamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al actualizar pedido: ${err.message}`, "error");
    }
  };

  const eliminarItem = async (index) => {
    try {
      const id = pedidos[index]?.id;
      if (!id) throw new Error("ID inválido para eliminar");

      console.log("🗑 Eliminando pedido ID:", id);
      await pedidoConsumiblesAPI.remove(id);
      showCustomToast("Éxito", "Pedido eliminado exitosamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al eliminar pedido: ${err.message}`, "error");
    }
  };

  const descargarResumen = () => {
    const todosLosDatos = [];

    if (datosFormulario) {
      todosLosDatos.push({
        seccion: "Formulario Actual",
        tipo: datosFormulario.tipo || "-",
        unidad: "personas",
        cantidad: datosFormulario.cantidad || "-",
        fecha: datosFormulario.fecha || "-",
        albergue: datosFormulario.albergue?.nombre || "-"
      });
    }

    if (items?.length) {
      items.forEach(item => {
        todosLosDatos.push({
          seccion: item.seccion || "Producto",
          tipo: item.tipo || "-",
          unidad: item.unidad || "-",
          cantidad: item.cantidad || "-",
          fecha: datosFormulario?.fecha || "-",
          albergue: datosFormulario?.albergue?.nombre || "-"
        });
      });
    }

    pedidos.forEach(pedido => todosLosDatos.push(pedido));

    if (!todosLosDatos.length) {
      showCustomToast("Warning", "No hay datos para descargar.", 'warning');
      return;
    }

    const encabezado = `"Sección","Tipo","Unidad","Cantidad","Fecha","Albergue"`;
    const cuerpo = todosLosDatos
      .map(i => `"${i.seccion}","${i.tipo}","${i.unidad}","${i.cantidad}","${i.fecha}","${i.albergue}"`)
      .join("\n");
    const textoConBOM = '\uFEFF' + `${encabezado}\n${cuerpo}`;
    const blob = new Blob([textoConBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumen_abastecimiento_completo.csv";
    a.click();
    URL.revokeObjectURL(url);

    showCustomToast("Éxito", "Descarga completada exitosamente.", "success");
  };

  const guardarDetallePedido = async (idPedido, items) => {
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`🔍 Detalle crudo ${i + 1}:`, item);

        if (!item.idConsumible || isNaN(Number(item.idConsumible))) {
          throw new Error(`El producto #${i + 1} no tiene un idConsumible válido`);
        }
        if (!item.cantidad || isNaN(Number(item.cantidad))) {
          throw new Error(`El producto #${i + 1} no tiene una cantidad válida`);
        }

        const detallePayload = {
          idPedido: Number(idPedido),
          idConsumible: Number(item.idConsumible),
          cantidad: Number(item.cantidad),
        };
        console.log(`📤 Enviando detalle ${i + 1}:`, detallePayload);

        await detallePedidoConsumiblesAPI.create(detallePayload);
      }
      showCustomToast("Éxito", "Detalle del pedido guardado correctamente", "success");
    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al guardar detalle: ${err.message}`, "error");
    }
  };

  const guardarPedidoYDetalle = async () => {
    try {
      const idUsuario = Number(localStorage.getItem("idUsuario")) || 42;

      const pedidoPayload = {
        tipoComida: datosFormulario.tipo?.trim(),
        cantidadPersonas: Number(datosFormulario.cantidad),
        idAlbergue: Number(datosFormulario.albergue?.id || datosFormulario.idAlbergue),
        idUsuarioCreacion: idUsuario,
      };

      console.log("📤 Payload pedido enviado:", pedidoPayload);

      const errorValidacion = validarPedido(pedidoPayload);
      if (errorValidacion) {
        showCustomToast("Error", errorValidacion, "error");
        return;
      }

      const pedidoRes = await pedidoConsumiblesAPI.create(pedidoPayload);
      const idPedido = pedidoRes.id || pedidoRes.data?.id;
      console.log("✅ Pedido creado con ID:", idPedido);

      if (!idPedido) throw new Error("No se pudo obtener el id del pedido creado");

      if (!items?.length) {
        showCustomToast("Warning", "No hay productos para guardar en el detalle", "warning");
        return;
      }

      await guardarDetallePedido(idPedido, items);
      showCustomToast("Éxito", "Pedido y detalle guardados correctamente", "success");
      descargarResumen();

    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al guardar pedido: ${err.message}`, "error");
    }
  };

  return {
    items,
    pedidos,
    datosFormulario,
    error,
    descargarResumen,
    eliminarItem,
    editarItem,
    navigate,
    guardarDetallePedido,
    guardarPedidoYDetalle,
  };
};

export default useResumenFinal;
