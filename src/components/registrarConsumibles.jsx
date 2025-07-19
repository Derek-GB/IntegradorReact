import React, { useState, useEffect } from "react";
import { consumiblesAPI } from "../helpers/api";
import "../styles/ajusteInventario.css";
import Alerta from "../components/Alerta.jsx";

const RegistroConsumibles = () => {
  const [form, setForm] = useState({
    nombre: "",
    categoriaProducto: "",
    unidadMedida: "",
    cantidad: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [mostrarAlertaMensaje, setMostrarAlertaMensaje] = useState(false);
  const [mostrarAlertaError, setMostrarAlertaError] = useState(false);

  useEffect(() => {
    if (mensaje) setMostrarAlertaMensaje(true);
  }, [mensaje]);

  useEffect(() => {
    if (error) setMostrarAlertaError(true);
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposIncompletos = Object.values(form).some((val) => val === "");
    if (camposIncompletos) {
      setError("Por favor complete todos los campos.");
      setMensaje("");
      return;
    }

    try {
      const payload = {
        nombre: form.nombre,
        unidadMedidaNombre: form.unidadMedida,
        categoriaNombre: form.categoriaProducto,
        cantidad: parseInt(form.cantidad),
      };

      await consumiblesAPI.create(payload);
      setMensaje("Consumible registrado correctamente.");
      setError("");
      setForm({
        nombre: "",
        categoriaProducto: "",
        unidadMedida: "",
        cantidad: "",
      });
    } catch (err) {
      console.error("Error al registrar consumible:", err);
      setError("Error al registrar consumible.");
      setMensaje("");
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Registro de Consumibles</h2>

        {mostrarAlertaMensaje && (
          <Alerta
            mensaje={mensaje}
            tipo="exito"
            duracion={4000}
            onClose={() => setMostrarAlertaMensaje(false)}
          />
        )}
        {mostrarAlertaError && (
          <Alerta
            mensaje={error}
            tipo="error"
            duracion={4000}
            onClose={() => setMostrarAlertaError(false)}
          />
        )}

        <label>
          Nombre del Producto:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
          />
        </label>

        <label>
          Categoría del Producto:
          <select
            name="categoriaProducto"
            value={form.categoriaProducto}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Higiene">Higiene</option>
            <option value="Ropa">Ropa</option>
            <option value="Medicamentos">Medicamentos</option>
            <option value="Otros">Otros</option>
          </select>
        </label>

        <label>
          Unidad de Medida:
          <select
            name="unidadMedida"
            value={form.unidadMedida}
            onChange={handleChange}
          >
            <option value="">Seleccione una unidad</option>
            <option value="Gramos">Gramos</option>
            <option value="Mililitros">Mililitros</option>
            <option value="Unidades">Unidades</option>
          </select>
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Ingrese la cantidad"
          />
        </label>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroConsumibles;
