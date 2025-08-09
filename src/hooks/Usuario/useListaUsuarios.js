import { useState, useEffect } from "react";
import { usuariosAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

export const useListaUsuarios = (rolUsuarioActual) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    console.log("[useListaUsuarios] Inicializando hook con rol:", rolUsuarioActual);
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    console.log("[fetchUsuarios] Iniciando carga de todos los usuarios");
    setLoading(true);
    try {
      const data = await usuariosAPI.getAll();
      console.log("[fetchUsuarios] Datos recibidos del back:", data);
      setUsuarios(Array.isArray(data) ? data : data.data ?? []);
    } catch (err) {
      console.error("[fetchUsuarios] Error al cargar usuarios:", err);
      showCustomToast("Error", "Error al cargar la lista de usuarios.", "error");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuario = async (e) => {
    e.preventDefault();
    console.log("[buscarUsuario] Texto de búsqueda:", busqueda);
    if (!busqueda.trim()) {
      console.log("[buscarUsuario] Búsqueda vacía, recargando lista completa");
      fetchUsuarios();
      return;
    }
    setLoading(true);
    try {
      const data = await usuariosAPI.getById(busqueda.trim());
      console.log("[buscarUsuario] Usuario encontrado:", data);
      setUsuarios(data ? [data] : []);
    } catch (err) {
      console.error("[buscarUsuario] Error al buscar usuario:", err);
      showCustomToast("Error", "Usuario no encontrado.", "error");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    console.log("[eliminarUsuario] ID recibido:", id);
    if (rolUsuarioActual !== "admin") {
      console.warn("[eliminarUsuario] Operación no permitida, el usuario no es admin");
      return;
    }
    if (!window.confirm("¿Seguro que desea eliminar este usuario?")) return;
    try {
      await usuariosAPI.delete(id);
      console.log("[eliminarUsuario] Usuario eliminado correctamente");
      showCustomToast("Éxito", "Usuario eliminado correctamente.", "success");
      fetchUsuarios();
    } catch (err) {
      console.error("[eliminarUsuario] Error al eliminar usuario:", err);
      showCustomToast("Error", "Error al eliminar usuario.", "error");
    }
  };

  const abrirModalEdicion = (usuario) => {
    console.log("[abrirModalEdicion] Usuario a editar:", usuario);
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    console.log("[cerrarModal] Cerrando modal de edición");
    setUsuarioEditando(null);
    setModalAbierto(false);
  };

  const guardarCambios = async (usuarioActualizado) => {
    console.log("[guardarCambios] Datos recibidos para guardar:", usuarioActualizado);
    if (rolUsuarioActual !== "admin") {
      console.warn("[guardarCambios] Operación no permitida, el usuario no es admin");
      return;
    }
    try {
      await usuariosAPI.update(usuarioActualizado);
      console.log("[guardarCambios] Usuario actualizado correctamente");
      showCustomToast("Éxito", "Usuario actualizado correctamente.", "success");
      cerrarModal();
      fetchUsuarios();
    } catch (err) {
      console.error("[guardarCambios] Error al actualizar usuario:", err);
      showCustomToast("Error", "Error al actualizar usuario.", "error");
    }
  };

  return {
    usuarios,
    loading,
    busqueda,
    setBusqueda,
    buscarUsuario,
    eliminarUsuario,
    abrirModalEdicion,
    modalAbierto,
    cerrarModal,
    usuarioEditando,
    guardarCambios,
    rolUsuarioActual
  };
};
