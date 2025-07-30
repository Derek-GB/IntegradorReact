import { createContext, useState } from 'react';

export const contextoAbastecimiento = createContext();

export const AbastecimientoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState(() => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    return datosGuardados ? JSON.parse(datosGuardados) : {};
  });

  const agregarItem = (nuevoItem) => {
    setItems(prev => [...prev, nuevoItem]);
  };

  const eliminarItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const editarItem = (index, nuevoItem) => {
    setItems(prev => prev.map((item, i) => i === index ? nuevoItem : item));
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
      datosFormulario 
    }}>
      {children}
    </contextoAbastecimiento.Provider>
  );
};
