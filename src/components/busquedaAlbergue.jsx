import React from 'react';
import { useUbicaciones } from '../hooks/useUbicaciones';
import '../styles/formulario.css';
import '../styles/indexx.css';

const BusquedaAlbergue = () => {
  const {
    provincias, cantones, distritos,
    setProvinciaId, setCantonId
  } = useUbicaciones();

  return (
<>
<div className="container main-content">
      <h2>Buscar Albergue</h2>
      <p>Seleccione la provincia, cantón y distrito para buscar albergues disponibles.</p>
    </div>
    <form className="search-bar">
      <select className="form-select mb-2" onChange={e => setProvinciaId(e.target.value)}>
        <option value="">Seleccione provincia</option>
        {provincias.map(p => <option key={p.idProvincia} value={p.idProvincia}>{p.descripcion}</option>)}
      </select>

      <select className="form-select mb-2" onChange={e => setCantonId(e.target.value)} disabled={!cantones.length}>
        <option value="">Seleccione cantón</option>
        {cantones.map(c => <option key={c.idCanton} value={c.idCanton}>{c.descripcion}</option>)}
      </select>

      <select className="form-select mb-2" disabled={!distritos.length}>
        <option value="">Seleccione distrito</option>
        {distritos.map(d => <option key={d.idDistrito} value={d.idDistrito}>{d.descripcion}</option>)}
      </select>

      <input type="text" className="form-control mb-2" placeholder="ID de albergue" />
      <input type="text" className="form-control mb-2" placeholder="Nombre de albergue" />
      <button type="submit" className="btn btn-primary">Buscar</button>
    </form>
</>
    
  );
};

export default BusquedaAlbergue;