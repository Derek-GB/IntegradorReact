import React, { useState, useEffect } from "react";
import "../styles/ajusteInventario.css";
import { familiasAPI, referenciasAPI } from "../helpers/api";

const AyudaForm = () => {
   const idUsuario = localStorage.getItem("idUsuario");
  const [familias, setFamilias] = useState([]);
  const [form, setForm] = useState({
    idFamilia: "",
    tipoAyuda: "",
    descripcion: "",
    fechaEntrega: "",
    responsable: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchFamilias = async () => {
      try {
        const res = await familiasAPI.getAll();
        setFamilias(Array.isArray(res) ? res : res.data ?? []);
      } catch  {
        setError("Error al cargar familias");
      }
    };
    fetchFamilias();
  }, []);

  const validarFormulario = () => {
    if (!form.idFamilia) return "Debe seleccionar una familia";
    if (!form.tipoAyuda) return "Debe seleccionar un tipo de ayuda";
    if (!form.descripcion.trim()) return "Debe ingresar una descripción";
    if (!form.fechaEntrega) return "Debe ingresar la fecha de entrega";
    if (!form.responsable.trim()) return "Debe ingresar el responsable";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validacion = validarFormulario();
    if (validacion) {
      setError(validacion);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idFamilia: Number(form.idFamilia),
        tipoAyuda: form.tipoAyuda,
        descripcion: form.descripcion,
        fechaEntrega: form.fechaEntrega,
        responsable: form.responsable,
        idUsuarioCreacion: Number(idUsuario),
      };

      await referenciasAPI.create(payload);

      setSuccess("Ayuda registrada correctamente");
      setForm({
        idFamilia: "",
        tipoAyuda: "",
        descripcion: "",
        fechaEntrega: "",
        responsable: "",
      });
    } catch (err) {
      setError("Error al registrar la ayuda: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <form className="ajuste-inventario-form" onSubmit={handleSubmit}>
        <h2>Registro de Ayuda Entregada</h2>

        <label>
          Código de Familia:
          <select name="idFamilia" value={form.idFamilia} onChange={handleChange}>
            <option value="">Seleccione familia</option>
            {familias.map((f) => (
              <option key={f.id || f.ID} value={f.id || f.ID}>
                {f.codigoFamilia || f.codigo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de Ayuda:
          <select name="tipoAyuda" value={form.tipoAyuda} onChange={handleChange}>
            <option value="">Seleccione tipo de ayuda</option>
            <option value="imas">IMAS</option>
            <option value="cruzroja">Cruz Roja</option>
            <option value="cne">CNE</option>
            <option value="refugio">Refugio</option>
            <option value="otros">Otros</option>
          </select>
        </label>

        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la ayuda"
          />
        </label>

        <label>
          Fecha de Entrega:
          <input
            type="date"
            name="fechaEntrega"
            value={form.fechaEntrega}
            onChange={handleChange}
          />
        </label>

        <label>
          Responsable:
          <input
            type="text"
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
            placeholder="Nombre del responsable"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default AyudaForm;
