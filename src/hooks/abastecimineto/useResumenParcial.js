
import { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';

export default function useResumenParcial() {
  const { items, eliminarItem } = useContext(contextoAbastecimiento);
  const [modalIndex, setModalIndex] = useState(null);
  const [editCantidad, setEditCantidad] = useState('');

  const abrirModal = (index) => {
    setModalIndex(index);
    setEditCantidad(items[index].cantidad);
  };

  const cerrarModal = () => {
    setModalIndex(null);
    setEditCantidad('');
  };

  const guardarEdicion = () => {
    if (editCantidad < 0) return;
    items[modalIndex].cantidad = editCantidad;
    cerrarModal();
  };

  return {
    items,
    eliminarItem,
    modalIndex,
    editCantidad,
    abrirModal,
    cerrarModal,
    guardarEdicion,
    setEditCantidad
  };
}
