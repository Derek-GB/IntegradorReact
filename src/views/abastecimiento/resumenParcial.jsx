import React from 'react';
import useResumenParcial from '../../hooks/abastecimineto/useResumenParcial';
import '../../styles/resumenParcial.css';


const ResumenParcial = () => {
  const {
    items,
    eliminarItem,
    modalIndex,
    editCantidad,
    abrirModal,
    cerrarModal,
    guardarEdicion,
    setEditCantidad
  } = useResumenParcial();

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
                    {}
                    <button 
                      onClick={() => abrirModal(index)} 
                      style={{ 
                        backgroundColor: '#FACC15', 
                        padding: '8px', 
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '5px' 
                      }}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                    {}
                    <button 
                      onClick={() => eliminarItem(index)} 
                      style={{ 
                        backgroundColor: '#FACC15', 
                        padding: '8px', 
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