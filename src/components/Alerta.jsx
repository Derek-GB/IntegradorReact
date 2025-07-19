import React, { useEffect, useState } from 'react';
import '../styles/alerta.css'; // Asegúrate de crear este archivo

const Alerta = ({ mensaje, tipo = 'info', duracion = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose(); // Llama al callback si se pasa
      }, 500); // Espera que termine la animación
    }, duracion);
    return () => clearTimeout(timeout);
  }, [duracion, onClose]);

  return (
    visible && (
      <div className={`alerta alerta-${tipo}`}>
        {mensaje}
      </div>
    )
  );
};

export default Alerta;
