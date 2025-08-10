import { useState, useEffect } from "react";
import { usuariosAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

export const useListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await usuariosAPI.getAll();
      setUsuarios(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      showCustomToast("Error", "Error al cargar la lista de usuarios.", "error");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuario = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      fetchUsuarios();
      return;
    }
    setLoading(true);
    try {
      const response = await usuariosAPI.getById(busqueda.trim());
      const usuario = response.data?.[0]?.[0] ?? null;
      setUsuarios(usuario ? [usuario] : []);
    } catch {
      showCustomToast("Error", "Usuario no encontrado.", "error");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
  console.log("Eliminar usuario con ID:", id);
  try {
    await usuariosAPI.delete(id);
    showCustomToast("Éxito", "Cambio de estado correctamente.", "success");
    await fetchUsuarios();
  } catch {
    showCustomToast("Error", "Error al cambiar de estado.", "error");
  }
};

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setUsuarioEditando(null);
    setModalAbierto(false);
  };

  const guardarCambios = async (usuarioActualizado) => {
    try {
      await usuariosAPI.update(usuarioActualizado);
      showCustomToast("Éxito", "Usuario actualizado correctamente.", "success");
      cerrarModal();
      fetchUsuarios();
    } catch {
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
  };
};
