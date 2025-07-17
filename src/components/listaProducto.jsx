import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://apiintegrador-production-8ef8.up.railway.app/api/Productos/all')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProductos(data);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  useEffect(() => {
    const seleccionado = productos.find(p => p.id == productoId);
    if (seleccionado) setForm(seleccionado);
  }, [productoId, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const actualizarProducto = async () => {
    try {
      await axios.put(`https://apiintegrador-production-8ef8.up.railway.app/api/Productos/id/${form.id}`, form);
      alert("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el producto.");
    }
  };

  const eliminarProducto = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await axios.delete(`https://apiintegrador-production-8ef8.up.railway.app/api/Productos/id/${form.id}`);
      alert("Producto eliminado con éxito.");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <div className="listaContainer main-content">
      <h2>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary"
          style={{ position: 'absolute', right: '1cm', top: '50%', transform: 'translateY(-50%)' }}
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        Lista de Productos
      </h2>

      <form>
        <details open>
          <summary><strong>Lista de Productos</strong></summary>
          <fieldset className="mt-2">
            <label>Producto:</label>
            <select value={productoId} onChange={(e) => setProductoId(e.target.value)} className="form-control mb-2">
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>
                  {`Código: ${p.codigoProducto} - ${p.nombre}`}
                </option>
              ))}
            </select>

            {form.id && (
              <fieldset className="mt-2">
                <label>ID:</label>
                <input type="text" name="id" value={form.id} className="form-control mb-2" readOnly />

                <label>Código del Producto:</label>
                <input type="text" name="codigoProducto" value={form.codigoProducto || ''} onChange={handleChange} className="form-control mb-2" required />

                <label>Nombre:</label>
                <input type="text" name="nombre" value={form.nombre || ''} onChange={handleChange} className="form-control mb-2" required />

                <label>Descripción:</label>
                <textarea name="descripcion" value={form.descripcion || ''} onChange={handleChange} className="form-control mb-2" rows="3" />

                <label>Cantidad:</label>
                <input type="number" name="cantidad" value={form.cantidad || 0} onChange={handleChange} className="form-control mb-2" min="0" required />

                <label>Categoría:</label>
                <select name="categoria" value={form.categoria || ''} onChange={handleChange} className="form-control mb-2" required>
                  <option value="">Seleccione una categoría</option>
                  <option>Carne</option>
                  <option>Proteína</option>
                  <option>Verdura</option>
                  <option>Reperte</option>
                  <option>Olores</option>
                  <option>Abarrotes</option>
                  <option>Limpieza</option>
                  <option>Mobiliario</option>
                </select>

                <label>Unidad de Medida:</label>
                <select name="unidadMedida" value={form.unidadMedida || ''} onChange={handleChange} className="form-control mb-2" required>
                  <option value="">Seleccione una unidad</option>
                  <option>Mililitros</option>
                  <option>Gramos</option>
                  <option>Unidades</option>
                </select>

                <div className="mt-3">
                  <button type="button" className="btn btn-success me-2" onClick={actualizarProducto}>Actualizar</button>
                  <button type="button" className="btn btn-danger" onClick={eliminarProducto}>Eliminar</button>
                </div>
              </fieldset>
            )}
          </fieldset>
        </details>
      </form>
    </div>
  );
};

export default ListaProducto;