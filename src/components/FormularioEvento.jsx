import { useState } from "react";

const FormularioEvento = () => {
  const [integrantes, setIntegrantes] = useState("");

  const guardarCantidadYContinuar = () => {
    const cantidad = parseInt(integrantes, 10);
    if (!cantidad || cantidad < 0) {
      alert("Por favor, ingrese una cantidad válida de integrantes.");
      return;
    }
    localStorage.setItem("cantidadIntegrantes", cantidad - 1);
    // Ajustar la ruta
    window.location.href = "formulario.html";
  };

  return (
    <form>
      <details open>
        <summary>
          <strong>Información</strong>
        </summary>
        <fieldset className="mt-2">
          <label htmlFor="evento">Tipo de Evento o Emergencia:</label>
          <select id="evento" className="form-control mb-2">
            <option value="">Seleccione una opción</option>
            <option value="inundacion">Inundación</option>
            <option value="terremoto">Terremoto</option>
            <option value="incendio">Incendio</option>
            <option value="deslizamiento">Deslizamiento</option>
          </select>

          <label htmlFor="integrantes">Cantidad de Integrantes</label>
          <input
            type="number"
            id="integrantes"
            className="form-control mb-2"
            placeholder="Ingrese la cantidad"
            value={integrantes}
            onChange={(e) => setIntegrantes(e.target.value)}
          />
        </fieldset>
      </details>

      <button
        type="button"
        className="btn btn-primary mt-3 pre"
        onClick={guardarCantidadYContinuar}
      >
        Continuar
      </button>
    </form>
  );
};

export default FormularioEvento;
