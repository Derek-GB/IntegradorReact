import React, { useEffect, useState } from 'react';
import { productosAPI } from '../helpers/api';
import Alerta from '../components/Alerta'; // Asegúrate de tener este import
import '../styles/registroMascota.css'; // o el CSS general que uses

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [form, setForm] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productosAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data || [];
        setProductos(lista);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setAlerta({
          mensaje: 'Error al cargar productos. Verifica si tu sesión expiró.',
          tipo: 'error'
        });
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const seleccionado = productos.find(p => p.id == productoId);
    if (seleccionado) {
      setForm(seleccionado);
      setIsDetailsOpen(true);
    } else {
      setForm({});
    }
  }, [productoId, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const actualizarProducto = async () => {
    try {
      const cantidadNum = Number(form.cantidad);
      if (isNaN(cantidadNum) || cantidadNum < 0) {
        setAlerta({
          mensaje: 'Cantidad debe ser un número válido mayor o igual a 0',
          tipo: 'error'
        });
        return;
      }
      const payload = {
        id: form.id,
        descripcion: form.descripcion || '',
        cantidad: cantidadNum,
      };
      await productosAPI.update(payload);
      setAlerta({
        mensaje: "Producto actualizado con éxito.",
        tipo: "exito"
      });
      setProductos(prev =>
        prev.map(p =>
          p.id === form.id ? { ...p, descripcion: payload.descripcion, cantidad: payload.cantidad } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar:", error);
      setAlerta({
        mensaje: "Error al actualizar el producto.",
        tipo: "error"
      });
    }
  };

  const eliminarProducto = async () => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await productosAPI.remove(form.id);
      setAlerta({
        mensaje: "Producto eliminado con éxito.",
        tipo: "exito"
      });
      setProductos(prev => prev.filter(p => p.id !== form.id));
      setProductoId('');
      setForm({});
    } catch (error) {
      console.error("Error al eliminar:", error);
      setAlerta({
        mensaje: "Error al eliminar el producto.",
        tipo: "error"
      });
    }
  };

  return (
    <div className="registro-usuario-container">
      <div className="registro-usuario-form">
        <h2>Lista de Suministros</h2>

        <form>
          <details open={isDetailsOpen} onToggle={(e) => setIsDetailsOpen(e.target.open)}>
            <summary><strong>Seleccionar Suministro</strong></summary>
            <fieldset className="mt-2">
              <label>Suministro:</label>
              <select
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Seleccione un suministro</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>
                    {`Código: ${p.codigoProducto} - ${p.nombre}`}
                  </option>
                ))}
              </select>

              {form.id && (
                <>
                  <label>ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={form.id}
                    className="form-control mb-2"
                    readOnly
                  />

                  <label>Código del Producto:</label>
                  <input
                    type="text"
                    name="codigoProducto"
                    value={form.codigoProducto || ''}
                    className="form-control mb-2"
                    readOnly
                  />

                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre || ''}
                    className="form-control mb-2"
                    readOnly
                  />

                  <label>Descripción:</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion || ''}
                    onChange={handleChange}
                    className="form-control mb-2"
                    rows="3"
                    required
                  />

                  <label>Cantidad:</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={form.cantidad !== undefined && form.cantidad !== null ? form.cantidad : ''}
                    onChange={handleChange}
                    className="form-control mb-2"
                    min="0"
                    required
                  />

                  <label>Categoría:</label>
                  <select
                    name="categoria"
                    value={form.categoria || ''}
                    className="form-control mb-2"
                    disabled
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="1">Carne</option>
                    <option value="2">Proteína</option>
                    <option value="3">Verdura</option>
                    <option value="4">Reperte</option>
                    <option value="5">Olores</option>
                    <option value="6">Abarrotes</option>
                    <option value="7">Limpieza</option>
                    <option value="8">Mobiliario</option>
                  </select>

                  <label>Unidad de Medida:</label>
                  <select
                    name="unidadMedida"
                    value={form.unidadMedida || ''}
                    className="form-control mb-3"
                    disabled
                  >
                    <option value="">Seleccione una unidad</option>
                    <option value="1">Mililitros</option>
                    <option value="2">Gramos</option>
                    <option value="3">Unidades</option>
                  </select>

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={actualizarProducto}
                    >
                      Actualizar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={eliminarProducto}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </fieldset>
          </details>
        </form>

        {alerta.mensaje && (
          <Alerta
            mensaje={alerta.mensaje}
            tipo={alerta.tipo}
            onClose={() => setAlerta({ mensaje: "", tipo: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default ListaProducto;
