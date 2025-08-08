import { createContext, useState, useEffect } from 'react';
import { showCustomToast } from '../components/globalComponents/CustomToaster.jsx';

export const contextoAbastecimiento = createContext();

export const AbastecimientoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState(() => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    return datosGuardados ? JSON.parse(datosGuardados) : {};
  });

  // Cargar datos guardados localmente si los hay
  useEffect(() => {
    const itemsGuardados = localStorage.getItem('items');
    if (itemsGuardados) {
      setItems(JSON.parse(itemsGuardados));
    }
  }, []);

  const guardarItemsEnLocalStorage = (nuevosItems) => {
    setItems(nuevosItems);
    localStorage.setItem('items', JSON.stringify(nuevosItems));
  };

  const agregarItem = (nuevoItem) => {
    // Validar duplicados
    const yaExiste = items.some(item =>
      item.tipo === nuevoItem.tipo &&
      item.unidad === nuevoItem.unidad &&
      item.seccion === nuevoItem.seccion
    );

    if (yaExiste) {
      showCustomToast("Este producto ya fue agregado", "warning");
      return;
    }

    const nuevosItems = [...items, nuevoItem];
    guardarItemsEnLocalStorage(nuevosItems);
    showCustomToast("Item agregado correctamente", "success");
  };

  const eliminarItem = (index) => {
    const nuevosItems = items.filter((_, i) => i !== index);
    guardarItemsEnLocalStorage(nuevosItems);
    showCustomToast("Item eliminado correctamente", "success");
  };

  const editarItem = (index, nuevoItem) => {
    const nuevosItems = [...items];
    nuevosItems[index] = nuevoItem;
    guardarItemsEnLocalStorage(nuevosItems);
    showCustomToast("Item editado correctamente", "success");
  };

  const limpiarItems = () => {
    setItems([]);
    localStorage.removeItem('items');
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
    }}>
      {children}
    </contextoAbastecimiento.Provider>
  );
};
