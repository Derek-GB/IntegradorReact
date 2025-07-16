import { useEffect, useState } from "react";
import "../styles/ajusteInventario.css";
import { productosAPI, ajusteInventarioAPI } from "../helpers/api";

export default function AjusteInventario() {
  const [productos, setProductos] = useState([]);
  const [idProducto, setIdProducto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [cantidadOriginal, setCantidadOriginal] = useState("");
  const [cantidadReal, setCantidadReal] = useState("");
  const [mensaje, setMensaje] = useState("");

  const fetchProductos = async () => {
      try {
        const res = await productosAPI.getAll();
        setProductos(res.data);
      } catch (error) {
        setMensaje("Error al cargar productos.", error.mensaje);
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

  useEffect(() => {
    if (!mensaje) return;
    alert(mensaje);
  }, [mensaje]);

  const handleAjuste = async (e) => {
    e.preventDefault();
    if (!idProducto || !motivo || !cantidadOriginal || !cantidadReal) {
      setMensaje("Completa todos los campos.");
      return;
    }

    try {
      await ajusteInventarioAPI.create({
        idProducto: Number(idProducto),
        justificacion: motivo,
        cantidadOriginal: Number(cantidadOriginal),
        cantidadAjustada: Number(cantidadReal),
        idUsuarioCreacion: localStorage.getItem("idUsuario"), // se obtiene del almacenamiento local
      });

      setMensaje("Ajuste registrado correctamente.");
      setIdProducto("");
      setMotivo("");
      setCantidadOriginal("");
      setCantidadReal("");
      fetchProductos();
    } catch (error) {
      setMensaje("Error al registrar el ajuste.", error.mensaje);
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <form className="ajuste-inventario-form" onSubmit={handleAjuste}>
        <h2>Ajuste de Inventario</h2>

        <label>
          Producto:
          <select
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
          >
            <option value="">Seleccionar producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Motivo:
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo del ajuste"
          />
        </label>

        <label>
          Cantidad registrada:
          <input
            type="number"
            value={cantidadOriginal}
            readOnly
            placeholder="Cantidad registrada"
          />
        </label>

        <label>
          Cantidad real:
          <input
            type="number"
            value={cantidadReal}
            onChange={(e) => setCantidadReal(e.target.value)}
            placeholder="Cantidad real"
          />
        </label>

        <button type="submit">Registrar Ajuste</button>
        {/* {mensaje && <p>{mensaje}</p>} */}
      </form>
    </div>
  );
}
