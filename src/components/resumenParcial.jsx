import React, { useContext, useState } from 'react';
import { AbastecimientoContext } from '../context/AbastecimientoContext';
import { useNavigate } from 'react-router-dom';

const ResumenParcial = () => {
  const { items, eliminarItem } = useContext(AbastecimientoContext);
  const navigate = useNavigate();
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

  return (
    <div className="content-area">
      <header className="top-header">
        <h1>Formulario de Abastecimiento</h1>
        <button className="back-button" onClick={() => navigate('/formulario')}>
          <span className="material-icons">arrow_back</span>
        </button>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Resumen Parcial de Productos</h2>
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Producto</th>
                <th>Unidad</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.seccion}</td>
                  <td>{item.tipo}</td>
                  <td>{item.unidad}</td>
                  <td>{item.cantidad}</td>
                  <td>
                    <button onClick={() => abrirModal(index)}>Editar</button>
                    <button onClick={() => eliminarItem(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="boton-resumen-final">
            <button onClick={() => navigate('/resumen-final')}>Ver resumen final</button>
          </div>

          <div className="boton-volver-formulario">
            <button onClick={() => navigate('/formulario')}>Volver al formulario</button>
          </div>
        </div>

        {modalIndex !== null && (
          <div className="modal">
            <div className="modal-contenido">
              <h3>Editar producto</h3>
              <p><strong>{items[modalIndex].tipo}</strong></p>
              <p>Unidad: {items[modalIndex].unidad}</p>
              <input
                type="number"
                min="0"
                value={editCantidad}
                onChange={(e) => setEditCantidad(e.target.value)}
              />
              <div className="modal-botones">
                <button onClick={guardarEdicion}>Guardar cambios</button>
                <button onClick={cerrarModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumenParcial;