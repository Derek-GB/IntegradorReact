import React, { useState, useEffect } from "react";
import "../styles/ajusteInventario.css";
import { familiasAPI, referenciasAPI } from "../helpers/api";
import Alerta from "../components/Alerta";

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
  const [mensaje, setMensaje] = useState(null); // Para usar con <Alerta />
  const [tipoMensaje, setTipoMensaje] = useState("exito"); // 'exito' o 'error'

  useEffect(() => {
    const fetchFamilias = async () => {
      try {
        const res = await familiasAPI.getAll();
        setFamilias(Array.isArray(res) ? res : res.data ?? []);
      } catch {
        setMensaje("Error al cargar familias");
        setTipoMensaje("error");
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
    setMensaje(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    const validacion = validarFormulario();
    if (validacion) {
      setMensaje(validacion);
      setTipoMensaje("error");
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

      setMensaje("Ayuda registrada correctamente");
      setTipoMensaje("exito");
      setForm({
        idFamilia: "",
        tipoAyuda: "",
        descripcion: "",
        fechaEntrega: "",
        responsable: "",
      });
    } catch{
      setMensaje("No se pudo registrar la ayuda. Inténtelo de nuevo.");
      setTipoMensaje("error");
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

        {mensaje && <Alerta tipo={tipoMensaje} mensaje={mensaje} />}
      </form>
    </div>
  );
};

export default AyudaForm;
