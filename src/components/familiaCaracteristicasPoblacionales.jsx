import React from "react";

const paises = [
  "Belice",
  "Costa Rica",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "Panamá",
  "Argentina",
  "Venezuela",
  "Colombia",
];

const gruposIndigenasCR = [
  "Bribri",
  "Cabécar",
  "Maleku",
  "Guaymí (Ngäbe)",
  "Boruca",
  "Térraba",
  "Chorotega",
];

const FamiliaCaracteristicasPoblacionales = ({ datos = {}, setDatos }) => {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;
    setDatos({ ...datos, [name]: nuevoValor });
  };

  return (
    <details open>
      <summary><strong>Características Poblacionales</strong></summary>
      <fieldset className="mt-2">
        <label>
          <input
            type="checkbox"
            name="indigena"
            checked={datos.indigena || false}
            onChange={handleChange}
          />
          Población Indígena
        </label>

        {datos.indigena && (
          <>
            <br />
            <label>Grupo indígena:</label>
            <select
              name="grupoIndigena"
              value={datos.grupoIndigena || ""}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="">Seleccione un grupo indígena</option>
              {gruposIndigenasCR.map((grupo) => (
                <option key={grupo} value={grupo}>
                  {grupo}
                </option>
              ))}
            </select>
          </>
        )}

        <br />

        <label>
          <input
            type="checkbox"
            name="migrante"
            checked={datos.migrante || false}
            onChange={handleChange}
          />
          Persona Migrante
        </label>

        {datos.migrante && (
          <>
            <br />
            <label>País de procedencia:</label>
            <select
              name="paises"
              value={datos.paises || ""}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="">Seleccione un país</option>
              {paises.map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </>
        )}
      </fieldset>
    </details>
  );
};

export default FamiliaCaracteristicasPoblacionales;
