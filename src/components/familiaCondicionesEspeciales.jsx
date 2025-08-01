import React from "react";

const FamiliaCondicionesEspeciales = ({ datos = {}, setDatos }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;
    setDatos({ ...datos, [name]: nuevoValor });
  };

  const mostrarCondiciones = datos.discapacidad === true;
  const mostrarInputOtroTipo = datos.tipoDiscapacidad === "Otro";
  const mostrarInputOtroSubtipo = datos.subtipoDiscapacidad === "Otro";

  return (
    <details open>
      <summary><strong>Condiciones Especiales</strong></summary>
      <fieldset className="mt-2">
        <label>¿Tiene alguna condición especial?</label>
        <br />
        <label className="me-3">
          <input
            type="radio"
            name="discapacidad"
            value={true}
            checked={datos.discapacidad === true}
            onChange={() => setDatos({ ...datos, discapacidad: true })}
          />{" "}
          Sí
        </label>
        <label>
          <input
            type="radio"
            name="discapacidad"
            value={false}
            checked={datos.discapacidad === false}
            onChange={() => setDatos({ ...datos, discapacidad: false })}
          />{" "}
          No
        </label>

        {mostrarCondiciones && (
          <>
            <br />
            <label>Tipo de condición especial:</label>
            <select
              name="tipoDiscapacidad"
              value={datos.tipoDiscapacidad || ""}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Embarazo">Embarazo</option>
              <option value="Presión">Presión</option>
              <option value="Hipertensión">Hipertensión</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Problemas cardíacos">Problemas cardíacos</option>
              <option value="Problemas respiratorios">Problemas respiratorios</option>
              <option value="Enfermedad renal">Enfermedad renal</option>
              <option value="Cáncer">Cáncer</option>
              <option value="Otro">Otro</option>
            </select>

            {mostrarInputOtroTipo && (
              <input
                type="text"
                name="otroTipoDiscapacidad"
                value={datos.otroTipoDiscapacidad || ""}
                onChange={handleChange}
                placeholder="Especifique otro tipo de condición"
                className="form-control mb-2"
              />
            )}

            <label>Subtipo de condición especial:</label>
            <select
              name="subtipoDiscapacidad"
              value={datos.subtipoDiscapacidad || ""}
              onChange={handleChange}
              className="form-select mb-2"
            >
              <option value="">Seleccione un subtipo</option>
              <option value="Presión baja">Presión baja</option>
              <option value="Presión alta">Presión alta</option>
              <option value="Crónica">Crónica</option>
              <option value="Otro">Otro</option>
            </select>

            {mostrarInputOtroSubtipo && (
              <input
                type="text"
                name="otroSubtipoDiscapacidad"
                value={datos.otroSubtipoDiscapacidad || ""}
                onChange={handleChange}
                placeholder="Especifique otro subtipo"
                className="form-control mb-2"
              />
            )}
          </>
        )}
      </fieldset>
    </details>
  );
};

export default FamiliaCondicionesEspeciales;
