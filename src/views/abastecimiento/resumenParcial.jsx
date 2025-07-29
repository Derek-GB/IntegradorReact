import { useContext, useState } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';

const ResumenParcial = () => {
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

  return (
    <div className="content-area">
      <main className="main-Content-abarrote">
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
                    {/* Botón de editar cuadrado */}
                    <button 
                      onClick={() => abrirModal(index)} 
                      style={{ 
                        backgroundColor: '#FACC15', // Color amarillo de Tailwind bg-yellow-500
                        padding: '8px', // Ajusta el padding para que sea cuadrado
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '5px' // Pequeño margen entre botones
                      }}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    {/* Botón de eliminar cuadrado */}
                    <button 
                      onClick={() => eliminarItem(index)} 
                      style={{ 
                        backgroundColor: '#FACC15', // Color amarillo de Tailwind bg-yellow-500
                        padding: '8px', // Ajusta el padding para que sea cuadrado
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalIndex !== null && (
          <div className="modal">
            <div className="modal-contenido">
              <h3>Editar producto</h3>
              <p>
                <strong>{items[modalIndex].tipo}</strong>
              </p>
              <p>Unidad: {items[modalIndex].unidad}</p>
              <input
                className="inputAbarrote"
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