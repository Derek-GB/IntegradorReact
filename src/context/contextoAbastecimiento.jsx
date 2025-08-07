import { createContext, useState, useEffect } from 'react';
import { pedidoConsumiblesAPI } from '../helpers/api.js';
import { showCustomToast } from '../components/globalComponents/CustomToaster.jsx';

export const contextoAbastecimiento = createContext();

export const AbastecimientoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState(() => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    return datosGuardados ? JSON.parse(datosGuardados) : {};
  });
  const [loading, setLoading] = useState(false);

  // Carga inicial desde API
  useEffect(() => {
    cargarItemsDesdeAPI();
  }, []);

  const cargarItemsDesdeAPI = async () => {
    setLoading(true);
    try {
      const data = await pedidoConsumiblesAPI.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      showCustomToast("Error cargando datos desde API: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const agregarItem = async (nuevoItem) => {
    try {
      const idAlbergue = datosFormulario?.idAlbergue;
      if (!idAlbergue) {
        showCustomToast("Error: falta idAlbergue en los datos del formulario", "error");
        return;
      }
      const payload = { ...nuevoItem, idAlbergue };

      const creado = await pedidoConsumiblesAPI.create(payload);
      setItems(prev => [...prev, creado]);
      showCustomToast("Item agregado correctamente", "success");
    } catch (error) {
      showCustomToast("Error agregando item: " + error.message, "error");
    }
  };

  const eliminarItem = async (index) => {
    try {
      const id = items[index]?.id;
      if (!id) throw new Error("ID inválido para eliminar");
      await pedidoConsumiblesAPI.remove(id);
      setItems(prev => prev.filter((_, i) => i !== index));
      showCustomToast("Item eliminado correctamente", "success");
    } catch (error) {
      showCustomToast("Error eliminando item: " + error.message, "error");
    }
  };

  const editarItem = async (index, nuevoItem) => {
    try {
      const id = items[index]?.id;
      if (!id) throw new Error("ID inválido para editar");
      const idAlbergue = datosFormulario?.idAlbergue;
      if (!idAlbergue) {
        showCustomToast("Error: falta idAlbergue en los datos del formulario", "error");
        return;
      }
      const payload = { ...nuevoItem, idAlbergue };

      const actualizado = await pedidoConsumiblesAPI.update(id, payload);
      setItems(prev => prev.map((item, i) => i === index ? actualizado : item));
      showCustomToast("Item actualizado correctamente", "success");
    } catch (error) {
      showCustomToast("Error actualizando item: " + error.message, "error");
    }
  };

  const limpiarItems = () => {
    setItems([]);
  };

  const guardarDatosFormulario = (datos) => {
    setDatosFormulario(datos);
    localStorage.setItem('datosFormulario', JSON.stringify(datos));
  };

  return (
    <contextoAbastecimiento.Provider value={{
      items,
      agregarItem,
      eliminarItem,
      editarItem,
      limpiarItems,
      guardarDatosFormulario,
      datosFormulario,
      loading,
      cargarItemsDesdeAPI,
    }}>
      {children}
    </contextoAbastecimiento.Provider>
  );
};
