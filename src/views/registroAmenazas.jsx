import React, { useState } from "react";
import "../styles/registroAmenazas.css";

export default function RegistroAmenazas() {  // <-- MAYÚSCULA aquí
  const [familia, setFamilia] = useState("");
  const [evento, setEvento] = useState("");
  const [peligro, setPeligro] = useState("");
  const [eventoEspecifico, setEventoEspecifico] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = (e) => {
    e.preventDefault();
    if (!familia || !evento || !peligro || !eventoEspecifico) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    setMensaje("Amenaza registrada correctamente.");
    setFamilia("");
    setEvento("");
    setPeligro("");
    setEventoEspecifico("");
  };

  return (
    <div className="registro-amenazas-fullscreen">
      <form className="registro-amenazas-form" onSubmit={handleRegistro}>
        <h2>Registro de Amenazas</h2>

        <label>
          Familia del Evento:
          <input
            type="text"
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
            placeholder="Ej: Hidrológico"
          />
        </label>

        <label>
          Evento:
          <input
            type="text"
            value={evento}
            onChange={(e) => setEvento(e.target.value)}
            placeholder="Ej: Inundación"
          />
        </label>

        <label>
          Peligro:
          <input
            type="text"
            value={peligro}
            onChange={(e) => setPeligro(e.target.value)}
            placeholder="Ej: Inundación"
          />
        </label>

        <label>
          Evento Específico:
          <input
            type="text"
            value={eventoEspecifico}
            onChange={(e) => setEventoEspecifico(e.target.value)}
            placeholder="Ej: Huracán Lesly"
          />
        </label>

        <button type="submit">Registrar</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}
