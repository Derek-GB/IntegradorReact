import React from "react";
import "../styles/ajusteInventario.css"; // Usa los mismos estilos

export default function VistaFamilia() {
  // Datos simulados (pueden venir luego de una API)
  const datosFamilia = {
    codigoFamilia: "FAM-00123",
    ubicacion: "San José, Costa Rica",
    integrantes: [
      {
        nombreCompleto: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        nacionalidad: "",
        parentesco: "",
        genero: "",
        sexo: "",
        fechaNacimiento: "",
        condicionesEspeciales: "",
        caracteristicasPoblacionales: "",
        contactoEmergencia: ""
      },
      {
        nombreCompleto: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        nacionalidad: "",
        parentesco: "",
        genero: "",
        sexo: "",
        fechaNacimiento: "",
        condicionesEspeciales: "",
        caracteristicasPoblacionales: "",
        contactoEmergencia: ""
      }
    ]
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <div className="ajuste-inventario-form">
        <h2>Detalles de la Familia</h2>

        <label>Código de Familia:</label>
        <input value={datosFamilia.codigoFamilia || ""} disabled />

        <label>Ubicación de la Familia:</label>
        <input value={datosFamilia.ubicacion || ""} disabled />

        <label>Cantidad de Personas:</label>
        <input value={datosFamilia.integrantes.length} disabled />

        {datosFamilia.integrantes.map((persona, index) => (
          <fieldset key={index} style={{ marginTop: "20px" }}>
            <legend>Integrante #{index + 1}</legend>

            <label>Nombre Completo:</label>
            <input value={persona.nombreCompleto || ""} disabled />

            <label>Tipo de Identificación:</label>
            <input value={persona.tipoIdentificacion || ""} disabled />

            <label>Número de Identificación:</label>
            <input value={persona.numeroIdentificacion || ""} disabled />

            <label>Nacionalidad:</label>
            <input value={persona.nacionalidad || ""} disabled />

            <label>Parentesco:</label>
            <input value={persona.parentesco || ""} disabled />

            <label>Género:</label>
            <input value={persona.genero || ""} disabled />

            <label>Sexo:</label>
            <input value={persona.sexo || ""} disabled />

            <label>Fecha de Nacimiento:</label>
            <input value={persona.fechaNacimiento || ""} disabled />

            <label>Condiciones Especiales:</label>
            <input value={persona.condicionesEspeciales || ""} disabled />

            <label>Características Poblacionales:</label>
            <input value={persona.caracteristicasPoblacionales || ""} disabled />

            <label>Contacto de Emergencia:</label>
            <input value={persona.contactoEmergencia || ""} disabled />
          </fieldset>
        ))}
      </div>
    </div>
  );
}