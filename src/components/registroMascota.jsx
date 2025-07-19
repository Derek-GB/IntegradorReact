import React, { useState } from "react";
import "../styles/registroMascota.css";

export default function RegistroMascotas() {
  const [familia, setFamilia] = useState("");
  const [tipo, setTipo] = useState("");
  const [tamano, setTamano] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleBuscarFamilia = () => {
    // Simulación de búsqueda
    setFamilia("Canino");
    setMensaje("Familia encontrada y seleccionada.");
  };

  const handleBuscarTipo = () => {
    // Simulación de búsqueda
    setTipo("Perro");
    setMensaje("Tipo encontrado y seleccionado.");
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    if (!familia || !tipo || !tamano || !nombre) {
      setMensaje("Completa todos los campos.");
      return;
    }
    setMensaje("Mascota registrada correctamente.");
    setFamilia("");
    setTipo("");
    setPelaje("");
    setTamano("");
    setNombre("");
    setPeso("");
    setEdad("");
  };

  return (
    <div className="registro-mascotas-fullscreen">
      <form className="registro-mascotas-form" onSubmit={handleRegistro}>
        <h2>Registro de Mascotas</h2>
        
        <label>
          Familia:
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={familia}
              onChange={(e) => setFamilia(e.target.value)}
              placeholder="Familia a la que pertenece la mascota"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleBuscarFamilia}
              title="Buscar familia"
              className="boton-buscar"
            >
              +
            </button>
          </div>
        </label>
        
        <label>
          Tipo:
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Ej: Canino, Felino, Ave, Roedor"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleBuscarTipo}
              title="Buscar tipo"
              className="boton-buscar"
            >
              +
            </button>
          </div>
        </label>
        
        <label>
          Tamaño:
          <input
            type="text"
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
            placeholder="Ej: Pequeño, Mediano, Grande"
          />
        </label>
        
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la mascota"
          />
        </label>
        
        <button type="submit">Registrar Mascota</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}