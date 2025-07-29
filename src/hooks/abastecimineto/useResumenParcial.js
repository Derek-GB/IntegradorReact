
import { useContext, useState } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';

const useResumenParcial = () => {
  const { items, eliminarItem } = useContext(contextoAbastecimiento);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editCantidad, setEditCantidad] = useState('');

  const abrirModal = (index) => {
    setSelectedIndex(index);
    setEditCantidad(items[index].cantidad);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setEditCantidad('');
  };

  const guardarEdicion = () => {
    if (editCantidad < 0 || selectedIndex === null) return;
    
    // Modificación directa del item
    items[selectedIndex].cantidad = editCantidad;
    
    cerrarModal();
  };

  const handleEliminar = (index) => {
    eliminarItem(index);
  };

  const selectedProduct = selectedIndex !== null ? items[selectedIndex] : null;

  return {
    items,
    isModalOpen,
    selectedProduct,
    editCantidad,
    setEditCantidad,
    abrirModal,
    cerrarModal,
    guardarEdicion,
    handleEliminar,
  };
};

export default useResumenParcial;
