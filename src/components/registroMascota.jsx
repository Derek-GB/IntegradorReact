import React, { useState, useEffect } from "react";
import { familiasAPI, mascotasAPI } from "../helpers/api";
import "../styles/registroMascota.css";

export default function RegistroMascotas() {
  const [familias, setFamilias] = useState([]);
  const [selectedFamilia, setSelectedFamilia] = useState("");
  const [tipo, setTipo] = useState("");
  const [tamano, setTamano] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const tiposMascota = ["Perro", "Gato", "Ave", "Roedor"];

  const fetchFamilias = async () => {
    try {
      setLoading(true);
      const data = await familiasAPI.getAll();
      const lista = Array.isArray(data) ? data : data.data ?? [];
      setFamilias(lista || []);
    } catch (error) {
      console.error('Error al cargar familias:', error);
      setFamilias([]);
      setMensaje("Error al cargar las familias disponibles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilias();
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();
    
    if (!selectedFamilia || !tipo || !tamano|| !nombreMascota) {
      setMensaje("Completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      
      const familiaSeleccionada = familias.find(fam => fam.codigoFamilia === selectedFamilia);
      
      if (!familiaSeleccionada) {
        throw new Error("Familia seleccionada no válida");
      }

      const mascotaData = {
        idFamilia: familiaSeleccionada.id || familiaSeleccionada._id,
        tipo: tipo,
        tamaño: tamano,
        nombreMascota: nombreMascota
      };

      const response = await mascotasAPI.create(mascotaData);
      
      setMensaje("Mascota registrada correctamente.");

      setSelectedFamilia("");
      setTipo("");
      setTamano("");
      setNombreMascota("");
      
      fetchFamilias();
      
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      setMensaje(error.response?.data?.message || error.message || "Error al registrar la mascota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-mascotas-fullscreen">
      <form className="registro-mascotas-form" onSubmit={handleRegistro}>
        <h2>Registro de Mascotas</h2>
        
        <label>
          Familia:
          <select
            value={selectedFamilia}
            onChange={(e) => setSelectedFamilia(e.target.value)}
            disabled={loading || familias.length === 0}
            required
          >
            <option value="">Seleccione una familia</option>
            {familias.map((fam) => (
              <option key={fam._id || fam.id} value={fam.codigoFamilia}>
                {fam.codigoFamilia}
              </option>
            ))}
          </select>
          {loading && familias.length === 0 && (
            <p>Cargando familias...</p>
          )}
          {!loading && familias.length === 0 && (
            <p>No hay familias disponibles</p>
          )}
        </label>
        
        <label>
          Tipo:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tiposMascota.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>
        
        <label>
          Tamaño:
          <select
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Seleccione un tamaño</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </label>
        
        <label>
          Nombre:
          <input
            type="text"
            value={nombreMascota}
            onChange={(e) => setNombreMascota(e.target.value)}
            placeholder="Nombre de la mascota"
            disabled={loading}
            required
          />
        </label>
        
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar Mascota"}
        </button>
        
        {mensaje && (
          <p className={mensaje.includes("Error") ? "error-message" : "success-message"}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}