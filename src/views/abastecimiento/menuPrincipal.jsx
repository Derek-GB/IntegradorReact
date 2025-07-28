import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento.jsx'; // 👈 IMPORTANTE

const opcionesComida = [
  { nombre: "Desayuno", value: "desayuno" },
  { nombre: "Almuerzo", value: "almuerzo" },
  { nombre: "Cena", value: "cena" },
];

const opcionesAlbergue = [
  { nombre: "Liceo de Bebedero" },
  { nombre: "Escuela de Bebedero" },
  { nombre: "Gimnasio Municipal - Manuel Melico Corella" },
  { nombre: "Universidad Invenio" },
  { nombre: "Salón Comunal de Javilla" },
  { nombre: "Salón Comunal de Paso Lajas" },
  { nombre: "Salón de Eventos de eventos Municipal" },
  { nombre: "Escuela San Cristobal" },
  { nombre: "Colegio Técnico Profesional de Cañas" },
  { nombre: "Salón comunal de Barrio Las Palmas" },
  { nombre: "Escuela Monseñor Luis Leipold" },
  { nombre: "Escuela Antonio Obando Espinoza" },
  { nombre: "Salón Comunal de Porozal" },
  { nombre: "Escuela San Miguel" },
  { nombre: "Escuela Barrio Hotel de Cañas" },
  { nombre: "Escuela Corobicí" },
  { nombre: "Gimnasio Antonio Obando Espinoza" },
  { nombre: "Salón Comunal Hotel" },
];

function FormularioAbastecimiento() {
  const navigate = useNavigate();
  const { guardarDatosFormulario } = useContext(contextoAbastecimiento);

  const [formData, setFormData] = useState({
    fecha: '',
    tipo: '',
    cantidad: '',
    albergue: '',
  });

  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setFormData({
      fecha: '',
      tipo: '',
      cantidad: '',
      albergue: '',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSiguiente = () => {
    const { fecha, tipo, cantidad, albergue } = formData;
    if (!fecha || !tipo || !cantidad || !albergue) {
      showCustomToast('Error', 'Complete todos los campos', 'error');
      return;
    }

    setLoading(true);
    guardarDatosFormulario(formData);
    showCustomToast('Éxito', 'Formulario guardado correctamente', 'success');
    navigate('/formularioAbarrotes.jsx');
    setLoading(false);
  };

  return (
    <>
      <FormContainer title="Formulario de Abastecimiento" size="md" onSubmit={e => e.preventDefault()}>
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
