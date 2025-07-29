import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../../components/globalComponents/CustomToaster.jsx";
import { useAbarrotesMenuPrincipal } from "../../hooks/abastecimineto/useAbarrotesMenuPrincipal.js";

function FormularioAbastecimiento() {
  const {
    formData,
    loading,
    today,
    opcionesComida,
    opcionesAlbergue,
    handleChange,
    handleSiguiente,
  } = useAbarrotesMenuPrincipal();

  return (
    <>
      <FormContainer
        title="Formulario de Abastecimiento"
        size="md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              required
              min={today}
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Cantidad de personas"
              name="cantidad"
              type="number"
              min="1"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <SelectField
              label="Nombre del albergue"
              name="albergue"
              value={formData.albergue}
              onChange={handleChange}
              options={opcionesAlbergue}
              optionLabel="nombre"
              optionValue="nombre"
              required
            />
          </div>
          <div className="flex-1">
            <SelectField
              label="Tipo de comida"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              options={opcionesComida}
              optionLabel="nombre"
              optionValue="value"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="flex-1">
            <SubmitButton
              type="button"
              width="w-full"
              color="text-white"
              onClick={handleSiguiente}
              loading={loading}
            >
              Siguiente
            </SubmitButton>
          </div>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}

export default FormularioAbastecimiento;
