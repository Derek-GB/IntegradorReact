import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formularioFusionado.css'; // Asegúrate de tener este archivo con tus estilos

const AsignacionRecursos = () => {
  const navigate = useNavigate();
  const [codigoFamilia, setCodigoFamilia] = useState('');
  const [articulo, setArticulo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);

  const agregarItem = () => {
    if (!articulo || !cantidad || cantidad < 1) {
      alert("Por favor, complete el artículo y la cantidad correctamente.");
      return;
    }

    setAsignaciones(prev => [...prev, { articulo, cantidad }]);
    setArticulo('');
    setCantidad('');
  };

  const eliminarItem = (index) => {
    setAsignaciones(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codigoFamilia || asignaciones.length === 0) {
      alert("Debe ingresar un código de familia y al menos un artículo.");
      return;
    }

    const data = {
      codigoFamilia,
      recursos: asignaciones
    };

    console.log("Asignación enviada:", data);
    alert("Asignación guardada exitosamente.");
    setCodigoFamilia('');
    setAsignaciones([]);
  };

  return (
    <>
      <div className="header">
        <h2>Asignacion de Recursos</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>

      <div className="asigContainer main-content" onSubmit={handleSubmit}>
        <fieldset className="fieldset1 mt-2">
          <legend>Recurso</legend>

          <div id='asignacionSuministro'>
            <div id='divProducto'>
              <label>Código de Familia:</label>
              <input
                type="text"
                value={codigoFamilia}
                onChange={e => setCodigoFamilia(e.target.value)}
                className="form-control mb-2"
                required
              />
            </div>

            <div id='divProducto'>
              <label>Artículo:</label>
              <select
                value={articulo}
                onChange={e => setArticulo(e.target.value)}
                className="form-select mb-2"
              >
                <option value="">Seleccione un artículo</option>
                <option value="Cobija">Cobija</option>
                <option value="Cama">Cama</option>
                <option value="Kit de cocina">Kit de cocina</option>
                <option value="Agua embotellada">Agua embotellada</option>
              </select>
            </div>
            <div id="divProducto">
              <label>Cantidad:</label>
              <input
                type="number"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                min="1"
                className="form-control mb-2"
                placeholder="Ingrese la cantidad"
              />
            </div>
            <button
              type="button"
              className="btn mb-3"
              onClick={agregarItem}
            >
              <span className="material-icons">add</span>
            </button>

          </div>

          {asignaciones.length > 0 && (
            <>
              <table className="tabla-asignacion table-responsive mt-4">
                <thead className="table-light">
                  <tr>
                    <th>Artículo</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaciones.map((item, index) => (
                    <tr key={index}>
                      <td>{item.articulo}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <button type="button" className="btnEliminarTabla" onClick={() => eliminarItem(index)}>
                          <span className='material-icons'>delete</span>
                        </button>
                        <button type="button" className="btnModificarTabla" >
                          <span className='material-icons'>edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='fieldset2 mt-3'>
                <div className='btn1Asig'>
                  <button type="reset" className="btn btn-secondary mt-3" onClick={() => setAsignaciones([])}>
                    Limpiar
                    <span className='material-icons'>cleaning_services </span>
                  </button>
                </div>
                <div className='btn2Asig'>
                  <button type="submit" className="btn btn-success mt-3">
                    Guardar asignación
                  <span className='material-icons'>save</span>
                  </button>

                </div>

              </div>
            </>
          )}
        </fieldset>

      </div>


    </>

  );
};

export default AsignacionRecursos;