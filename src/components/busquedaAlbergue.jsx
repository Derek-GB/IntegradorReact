import React from 'react';
import { useUbicaciones } from '../hooks/useUbicaciones';
import '../styles/busquedaAlbergue.css';

const BusquedaAlbergue = () => {
  const {
    provincias, cantones, distritos,
    setProvinciaId, setCantonId
  } = useUbicaciones();

  return (
    <div className="busqueda-container">
      <div className="header">
        <h2 className="titulo">Búsqueda de Albergue</h2>
      </div>

      <form className="formulario-horizontal">
        <div className="campo-horizontal">
          <input type="text" className="form-control" placeholder="ID Albergue" />
        </div>

        <div className="campo-horizontal">
          <select className="form-select" onChange={e => setProvinciaId(e.target.value)}>
            <option value="">Provincia</option>
            {provincias.map(p => (
              <option key={p.idProvincia} value={p.idProvincia}>{p.descripcion}</option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal">
          <select className="form-select" onChange={e => setCantonId(e.target.value)} disabled={!cantones.length}>
            <option value="">Cantón</option>
            {cantones.map(c => (
              <option key={c.idCanton} value={c.idCanton}>{c.descripcion}</option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal">
          <select className="form-select" disabled={!distritos.length}>
            <option value="">Distrito</option>
            {distritos.map(d => (
              <option key={d.idDistrito} value={d.idDistrito}>{d.descripcion}</option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal nombre-busqueda">
          <input type="text" className="form-control" placeholder="Nombre" />
        </div>

        <div className="campo-horizontal">
          <button type="submit" className="btn-buscar">Buscar</button>
        </div>

      </form>
    </div>
  );
};

export default BusquedaAlbergue;
