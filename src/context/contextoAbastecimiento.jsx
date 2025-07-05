// src/context/AbastecimientoContext.jsx
import { createContext, useState } from 'react';

export const contextoAbastecimiento = createContext();

export const AbastecimientoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const agregarItem = (nuevoItem) => {
    setItems(prev => [...prev, nuevoItem]);
  };

  const eliminarItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <contextoAbastecimiento.Provider value={{ items, agregarItem, eliminarItem }}>
      {children}
    </contextoAbastecimiento.Provider>
  );
};