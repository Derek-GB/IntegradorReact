import React, { useEffect, useState } from 'react';
import { productosAPI } from '../../helpers/api';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import SearchAutocompleteInput from '../../components/FormComponents/SearchAutocompleteInput.jsx';

const categorias = [
  { nombre: "Carne", value: "1" },
  { nombre: "Proteína", value: "2" },
  { nombre: "Verdura", value: "3" },
  { nombre: "Reperte", value: "4" },
  { nombre: "Olores", value: "5" },
  { nombre: "Abarrotes", value: "6" },
  { nombre: "Limpieza", value: "7" },
  { nombre: "Mobiliario", value: "8" },
];

const unidades = [
  { nombre: "Mililitros", value: "1" },
  { nombre: "Gramos", value: "2" },
  { nombre: "Unidades", value: "3" },
];

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productosAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data || [];
        setProductos(lista);
      } catch {
        showCustomToast('Error', 'Error al cargar productos. Verifica si tu sesión expiró.', 'error');
      }
    };
    fetchProductos();
  }, []);

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
    } catch (error) {
      showCustomToast("Error", "Error al eliminar el producto.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Lista de Suministros" size="md" onSubmit={actualizarProducto}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <SearchAutocompleteInput
            label="Buscar Suministro"
            busqueda={busquedaProducto}
            setBusqueda={setBusquedaProducto}
            showSugerencias={showSugerencias}
            setShowSugerencias={setShowSugerencias}
            resultados={productos}
            onSelect={handleSelectProducto}
            optionLabelKeys={["codigoProducto", "nombre"]}
            placeholder="Código o nombre del producto..."
          />
        </div>
        {form.id && (
          <>
            <div className="flex-1">
              <InputField
                label="ID"
                name="id"
                value={form.id}
                readOnly
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Código del Producto"
                name="codigoProducto"
                value={form.codigoProducto || ''}
                readOnly
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Nombre"
                name="nombre"
                value={form.nombre || ''}
                readOnly
              />
            </div>
          </>
        )}
      </div>
      {form.id && (
        <>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <InputField
                label="Descripción"
                name="descripcion"
                value={form.descripcion || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Cantidad"
                name="cantidad"
                type="number"
                min="0"
                value={form.cantidad !== undefined && form.cantidad !== null ? form.cantidad : ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Categoría"
                name="categoria"
                value={form.categoria || ''}
                options={categorias}
                optionLabel="nombre"
                optionValue="value"
                disabled
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Unidad de Medida"
                name="unidadMedida"
                value={form.unidadMedida || ''}
                options={unidades}
                optionLabel="nombre"
                optionValue="value"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex-1 flex gap-4">
              <SubmitButton
                type="submit"
                width="w-full"
                loading={loading}
                color='text-black'
              >
                Actualizar
              </SubmitButton>
              <SubmitButton
                type="button"
                width="w-full"
                color="text-black bg-red-600 hover:bg-red-700"
                onClick={eliminarProducto}
                disabled={loading}
              >
                Eliminar
              </SubmitButton>
            </div>
          </div>
        </>
      )}
      <CustomToaster />
    </FormContainer>
  );
};

export default ListaProducto;