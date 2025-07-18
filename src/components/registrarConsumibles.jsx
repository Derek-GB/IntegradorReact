import React, { useState } from "react";
import "../styles/ajusteInventario.css"; // reutiliza el mismo estilo

const RegistroConsumibles = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcionProducto: "",
    codigo: "",
    categoriaProducto: "",
    cantidad: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposIncompletos = Object.values(form).some((val) => val === "");
    if (camposIncompletos) {
      setMensaje("Por favor complete todos los campos.");
      return;
    }

    try {
      console.log("Datos registrados:", form);
      setMensaje("Consumible registrado correctamente.");
      setForm({
        nombre: "",
        descripcionProducto: "",
        codigo: "",
        categoriaProducto: "",
        cantidad: "",
      });
    } catch {
      setMensaje("Error al registrar consumible.");
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Registro de Consumibles</h2>

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
          Código:
          <input
            type="number"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Ingrese el código"
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
            <option value="alimentos">Alimentos</option>
            <option value="higiene">Higiene</option>
            <option value="ropa">Ropa</option>
            <option value="medicamentos">Medicamentos</option>
            <option value="otros">Otros</option>
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

        <label>
          Descripción del Producto:
          <input
            type="text"
            name="descripcionProducto"
            value={form.descripcionProducto}
            onChange={handleChange}
            placeholder="Descripción del producto"
          />
        </label>

        <button type="submit">Registrar</button>

        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegistroConsumibles;
