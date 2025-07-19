import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActualizarAlbergue = () => {
  const [albergues, setAlbergues] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [albergue, setAlbergue] = useState(null);
  const navigate = useNavigate();

  const API_URL = 'https://apiintegrador-production-8ef8.up.railway.app/api/albergues';

  useEffect(() => {
    axios.get(`${API_URL}/all`)
      .then(res => setAlbergues(res.data.data || []))
      .catch(err => console.error('Error cargando albergues:', err));
  }, []);

  useEffect(() => {
    const selected = albergues.find(a => a.id === parseInt(selectedId));
    setAlbergue(selected || null);
  }, [selectedId, albergues]);

  const handleActualizar = async () => {
    try {
      await axios.put(`${API_URL}/id/${albergue.id}`, albergue);
      alert('Albergue actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('No se pudo actualizar el albergue.');
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este albergue?')) return;
    try {
      await axios.delete(`${API_URL}/id/${albergue.id}`);
      alert('Albergue eliminado correctamente.');
      window.location.reload(); // refresca lista
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('No se pudo eliminar el albergue.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbergue(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)' }}
        >
          <span className="material-icons">arrow_back</span>
        </button>
        Actualizar Albergue
      </h2>

      <form>
        <details open>
          <summary><strong>Seleccionar Albergue</strong></summary>
          <fieldset className="mt-2">
            <label>Albergue:</label>
            <select
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              className="form-control mb-3"
            >
              <option value="">Seleccione un albergue</option>
              {albergues.map(a => (
                <option key={a.id} value={a.id}>
                  {`${a.idAlbergue} - ${a.nombre}`}
                </option>
              ))}
            </select>

            {albergue && (
              <fieldset>
                {Object.entries(albergue).map(([key, value]) => (
                  <div key={key}>
                    <label htmlFor={key}>{key}:</label>
                    <input
                      type={typeof value === 'number' ? 'number' : 'text'}
                      id={key}
                      name={key}
                      value={value || ''}
                      onChange={handleChange}
                      className="form-control mb-2"
                      readOnly={key === 'id'}
                    />
                  </div>
                ))}

                <div className="mt-3">
                  <button type="button" className="btn btn-success me-2" onClick={handleActualizar}>
                    Actualizar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleEliminar}>
                    Eliminar
                  </button>
                </div>
              </fieldset>
            )}
          </fieldset>
        </details>
      </form>
    </div>
  );
};

export default ActualizarAlbergue;
