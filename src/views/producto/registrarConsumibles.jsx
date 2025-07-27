import React, { useState, useEffect } from "react";
import { consumiblesAPI } from "../../helpers/api.js";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster, { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const categorias = [
  { nombre: "Alimentos" },
  { nombre: "Higiene" },
  { nombre: "Ropa" },
  { nombre: "Medicamentos" },
  { nombre: "Otros" },
];

const unidades = [
  { nombre: "Gramos" },
  { nombre: "Mililitros" },
  { nombre: "Unidades" },
];

const RegistroConsumibles = () => {
  const [form, setForm] = useState({
    nombre: "",
    categoriaProducto: "",
    unidadMedida: "",
    cantidad: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposIncompletos = Object.values(form).some((val) => val === "");
    if (camposIncompletos) {
      showCustomToast("Error", "Por favor complete todos los campos.", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        nombre: form.nombre,
        unidadMedidaNombre: form.unidadMedida,
        categoriaNombre: form.categoriaProducto,
        cantidad: parseInt(form.cantidad),
      };

      await consumiblesAPI.create(payload);
      showCustomToast("Éxito", "Consumible registrado correctamente.", "success");
      setForm({
        nombre: "",
        categoriaProducto: "",
        unidadMedida: "",
        cantidad: "",
      });
    } catch (err) {
      showCustomToast("Error", "Error al registrar consumible.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormContainer
        title="Registro de Consumibles"
        onSubmit={handleSubmit}
        size="md"
      >
        <fieldset className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="Nombre del Producto"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </div>
            <div className="flex-1">
          
              <InputField
                label="Cantidad"
                name="cantidad"
                type="number"
                min="0"
                value={form.cantidad}
                onChange={handleChange}
                placeholder="Ingrese la cantidad"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <SelectField
                label="Unidad de Medida"
                name="unidadMedida"
                value={form.unidadMedida}
                onChange={handleChange}
                options={unidades}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
            <div className="flex-1">
            <SelectField
                label="Categoría del Producto"
                name="categoriaProducto"
                value={form.categoriaProducto}
                onChange={handleChange}
                options={categorias}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
          </div>
        </fieldset>
        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full" loading={loading}>
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
};

export default RegistroConsumibles;