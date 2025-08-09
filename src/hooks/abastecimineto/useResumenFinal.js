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
      console.log("Datos recibidos de la API:", data);

      if (data && data.data && Array.isArray(data.data)) {
        const mapeado = data.data.map(item => ({
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

        setPedidos(mapeado);
      } else if (Array.isArray(data)) {
        const mapeado = data.map(item => ({
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

        setPedidos(mapeado);
      } else {
        setPedidos([]);
      }
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError(err.message);
      showCustomToast("Error", `Error al cargar pedidos: ${err.message}`, "error");
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
      const id = pedidos[index]?.id;
      if (!id) throw new Error("ID inválido para editar");

      const errorValidacion = validarPedido(nuevoItem);
      if (errorValidacion) {
        showCustomToast("Error", errorValidacion, "error");
        return;
      }

      const payload = {
        tipoComida: nuevoItem.tipo.trim(),
        cantidadPersonas: Number(nuevoItem.cantidad),
        idAlbergue: Number(nuevoItem.idAlbergue),
        idUsuarioCreacion: Number(nuevoItem.idUsuarioCreacion),
      };

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

      await pedidoConsumiblesAPI.remove(id);
      showCustomToast("Éxito", "Pedido eliminado exitosamente", "success");
      await cargarPedidos();
    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al eliminar pedido: ${err.message}`, "error");
    }
  };

  const descargarResumen = () => {
    // Combinar datos del formulario actual con productos
    const todosLosDatos = [];
    
    // Agregar datos del formulario actual si existen
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

    // Agregar productos del formulario actual
    if (items && items.length > 0) {
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

    // Agregar pedidos de la API
    pedidos.forEach(pedido => {
      todosLosDatos.push(pedido);
    });

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
      for (const item of items) {
        await detallePedidoConsumiblesAPI.create({
          idPedido,
          idConsumible: item.idConsumible,
          cantidad: item.cantidad,
        });
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
        tipoComida: datosFormulario.tipo,
        cantidadPersonas: datosFormulario.cantidad,
        idAlbergue: datosFormulario.albergue?.id || datosFormulario.idAlbergue,
        idUsuarioCreacion: idUsuario,
      };
      
      const pedidoRes = await pedidoConsumiblesAPI.create(pedidoPayload);
      const idPedido = pedidoRes.id || pedidoRes.data?.id;
      
      if (!idPedido) throw new Error("No se pudo obtener el id del pedido creado");

      if (!items || items.length === 0) {
        showCustomToast("Warning", "No hay productos para guardar en el detalle", "warning");
        return;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const detallePayload = {
          idPedido,
          idConsumible: item.idConsumible,
          cantidad: item.cantidad,
        };
        try {
          await detallePedidoConsumiblesAPI.create(detallePayload);
        } catch (detalleError) {
          throw new Error(`Error guardando producto ${i + 1}: ${detalleError.message}`);
        }
      }

      showCustomToast("Éxito", "Pedido y detalle guardados correctamente", "success");
      descargarResumen();

    } catch (err) {
      setError(err.message);
      showCustomToast("Error", `Error al guardar pedido: ${err.message}`, "error");
    }
  };
  return {
    items, // Productos del formulario actual
    pedidos, // Pedidos de la API
    datosFormulario, // Datos del formulario actual
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
