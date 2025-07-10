import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/formulario.css';
import '../styles/indexx.css';

const RegistroSuministros = () => {
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
    <div className="pantalla-completa">
      <div className="container-formulario">
        <div className="flecha-volver">
          <button
            onClick={() => navigate('/inicio')}
            className="btn btn-secondary boton-regresar"
            aria-label="Regresar"
          >
            <span className="material-icons">arrow_back</span>
          </button>
        </div><br />

        <h2 className="titulo-formulario">Asignación de Recursos</h2>

        <form onSubmit={handleSubmit} className="formulario-asignacion">
          <details open>
            <summary><strong>Formulario de Asignación</strong></summary>
            <fieldset className="mt-3">
              <label htmlFor="codigoFamilia">Código de Familia:</label>
              <input
                id="codigoFamilia"
                type="text"
                value={codigoFamilia}
                onChange={e => setCodigoFamilia(e.target.value)}
                className="form-control mb-3"
                placeholder="Ingrese el código de familia"
                required
              />

              <label htmlFor="articulo">Artículo:</label>
              <select
                id="articulo"
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

              <label htmlFor="cantidad">Cantidad:</label>
              <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
                min="1"
                className="form-control mb-2"
                placeholder="Ingrese la cantidad"
              />

              <button
                type="button"
                className="btn btn-warning mt-2"
                onClick={agregarItem}
              >
                + Agregar otro artículo
              </button>
            </fieldset>
          </details>

          {asignaciones.length > 0 && (
            <div className="tabla-contenedor mt-4">
              <h4>Artículos Asignados</h4>
              <table className="table table-bordered table-striped">
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
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarItem(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="botones mt-4">
            <button type="submit" className="btn btn-success me-2">Guardar asignación</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setAsignaciones([]);
                setCodigoFamilia('');
              }}
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default RegistroSuministros;
