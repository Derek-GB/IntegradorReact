import { useEffect, useState } from 'react';
import { productosAPI } from '../../helpers/api';
import { showCustomToast } from '../../components/globalComponents/CustomToaster';

export const useListaSuministro = () => {
  const [productos, setProductos] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const idUsuario = localStorage.getItem("idUsuario");

        if (!idUsuario) {
          showCustomToast("Error", "No se encontró el ID del usuario en localStorage.", "error");
          return;
        }

        const data = await productosAPI.getByUsuario(idUsuario);
        const lista = Array.isArray(data) ? data : data?.data ?? [];

        console.log("📦 Productos cargados por usuario:", lista);

        setProductos(lista);
      } catch (error) {
        console.error("❌ Error al cargar productos por usuario:", error);
        showCustomToast(
          'Error',
          'Error al cargar productos. Verifica si tu sesión expiró.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const valor = busquedaProducto?.trim();
    if (valor === '') {
      setForm({});
    }
  }, [busquedaProducto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectProducto = (producto) => {
    setForm(producto || {});
    setBusquedaProducto(producto ? `Código: ${producto.codigoProducto} - ${producto.nombre}` : '');
  };

  const actualizarProducto = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cantidadNum = Number(form.cantidad);
      if (isNaN(cantidadNum) || cantidadNum < 0) {
        showCustomToast('Error', 'Cantidad debe ser un número válido mayor o igual a 0', 'error');
        setLoading(false);
        return;
      }
      const payload = {
        id: form.id,
        descripcion: form.descripcion || '',
        cantidad: cantidadNum,
      };
      await productosAPI.update(payload);
      showCustomToast("Éxito", "Producto actualizado con éxito.", "success");
      setProductos(prev =>
        prev.map(p =>
          p.id === form.id ? { ...p, descripcion: payload.descripcion, cantidad: payload.cantidad } : p
        )
      );
      setForm({});
      setBusquedaProducto('');
    } catch {
      showCustomToast("Error", "Error al actualizar el producto.", "error");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async () => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    setLoading(true);
    try {
      await productosAPI.remove(form.id);
      showCustomToast("Éxito", "Producto eliminado con éxito.", "success");
      setProductos(prev => prev.filter(p => p.id !== form.id));
      setBusquedaProducto('');
      setForm({});
    } catch {
      showCustomToast("Error", "Error al eliminar el producto.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    productos,
    busquedaProducto,
    setBusquedaProducto,
    showSugerencias,
    setShowSugerencias,
    form,
    setForm,
    loading,
    handleChange,
    handleSelectProducto,
    actualizarProducto,
    eliminarProducto,
  };
};
