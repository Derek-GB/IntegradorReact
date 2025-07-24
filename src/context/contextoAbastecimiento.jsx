import { createContext, useState } from 'react';

export const contextoAbastecimiento = createContext();

export const AbastecimientoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({});

  const agregarItem = (nuevoItem) => {
    setItems(prev => [...prev, nuevoItem]);
  };

  const eliminarItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const guardarDatosFormulario = (datos) => {
    setDatosFormulario(datos);
  };

  return (
    <contextoAbastecimiento.Provider value={{
      items,
      agregarItem,
      eliminarItem,
      datosFormulario,
      guardarDatosFormulario
    }}>
      {children}
    </contextoAbastecimiento.Provider>
  );
};
