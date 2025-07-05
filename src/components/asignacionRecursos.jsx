import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formulario.css';
import '../styles/indexx.css';

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
    <div className="container main-content">
      <h2>
        <button
          onClick={() => navigate('/inicio')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)', padding: '8px' }}
          aria-label="Regresar"
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Asignación de Recursos
      </h2>

      <form onSubmit={handleSubmit} className="form-control">
        <details open>
          <summary><strong>Asignación de Recursos</strong></summary>
          <fieldset className="mt-2">
            <label>Código de Familia:</label>
            <input
              type="text"
              value={codigoFamilia}
              onChange={e => setCodigoFamilia(e.target.value)}
              className="form-control mb-2"
              required
            />

            <div>
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

            <button type="button" className="btn btn-warning mb-3" onClick={agregarItem}>+ Agregar otro artículo</button>

            {asignaciones.length > 0 && (
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
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => eliminarItem(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </fieldset>
        </details>
        <button type="submit" className="btn btn-success mt-3">Guardar asignación</button>
        <button type="reset" className="btn btn-secondary mt-3" onClick={() => setAsignaciones([])}>Limpiar</button>
      </form>

    </div>
  );
};

export default AsignacionRecursos;