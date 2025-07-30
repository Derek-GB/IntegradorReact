import { useEffect, useState } from "react";
import { productosAPI, ajusteInventarioAPI } from "../helpers/api";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import SearchAutocompleteInput from "../components/FormComponents/SearchAutocompleteInput.jsx";
import CustomToaster, { showCustomToast } from "../components/globalComponents/CustomToaster.jsx";

export default function AjusteInventario() {
  const [productos, setProductos] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [idProducto, setIdProducto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [cantidadOriginal, setCantidadOriginal] = useState("");
  const [cantidadReal, setCantidadReal] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProductos = async () => {
    try {
      const res = await productosAPI.getAll();
      setProductos(res.data || []);
    } catch (error) {
      showCustomToast("Error", "Error al cargar productos.", "error");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const productoSeleccionado = productos.find(p => p.id === Number(idProducto));
    setCantidadOriginal(productoSeleccionado?.cantidad ?? "");
    setCantidadReal("");
    setMotivo("");
  }, [idProducto, productos]);

  const handleSelectProducto = (producto) => {
    setIdProducto(producto?.id || "");
    setBusquedaProducto(producto ? `${producto.codigoProducto} - ${producto.nombre}` : "");
  };

  const handleAjuste = async (e) => {
    e.preventDefault();
    if (!idProducto || !motivo || cantidadOriginal === "" || cantidadReal === "") {
      showCustomToast("Error", "Completa todos los campos.", "error");
      return;
    }
    setLoading(true);
    try {
      await ajusteInventarioAPI.create({
        idProducto: Number(idProducto),
        justificacion: motivo,
        cantidadOriginal: Number(cantidadOriginal),
        cantidadAjustada: Number(cantidadReal),
        idUsuarioCreacion: localStorage.getItem("idUsuario"),
      });
      showCustomToast("Éxito", "Ajuste registrado correctamente.", "success");
      setIdProducto("");
      setMotivo("");
      setCantidadOriginal("");
      setCantidadReal("");
      setBusquedaProducto("");
      fetchProductos();
    } catch (error) {
      showCustomToast("Error", "Error al registrar el ajuste.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormContainer title="Ajuste de Inventario" onSubmit={handleAjuste} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <SearchAutocompleteInput
              label="Producto"
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
          <div className="flex-1">
            <InputField
              label="Motivo"
              name="motivo"
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              placeholder="Motivo del ajuste"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Cantidad registrada"
              name="cantidadOriginal"
              type="number"
              value={cantidadOriginal}
              readOnly
              placeholder="Cantidad registrada"
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Cantidad real"
              name="cantidadReal"
              type="number"
              value={cantidadReal}
              onChange={e => setCantidadReal(e.target.value)}
              placeholder="Cantidad real"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <SubmitButton color="text-black" width="w-full" loading={loading}>
            Registrar Ajuste
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}