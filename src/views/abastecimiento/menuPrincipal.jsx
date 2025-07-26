import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

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
  const [formData, setFormData] = useState({
    fecha: '',
    comida: '',
    personas: '',
    albergue: '',
  });

  const [guardado, setGuardado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    if (datosGuardados) {
      setFormData(JSON.parse(datosGuardados));
      setGuardado(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    const { fecha, comida, personas, albergue } = formData;
    if (!fecha || !comida || !personas || !albergue) {
      showCustomToast('Error', 'Complete todos los campos', 'error');
      return;
    }
    localStorage.setItem('datosFormulario', JSON.stringify(formData));
    setGuardado(true);
    showCustomToast('Éxito', 'Formulario guardado correctamente', 'success');
  };

  const handleEnviar = () => {
    const datosGuardados = localStorage.getItem('datosFormulario');
    if (!datosGuardados) {
      showCustomToast('Error', 'Debe guardar el formulario antes de enviar.', 'error');
      return;
    }
    const { fecha, comida, personas, albergue } = formData;
    if (!fecha || !comida || !personas || !albergue) {
      showCustomToast('Error', 'Complete todos los campos', 'error');
      return;
    }
    // Aquí iría tu lógica de envío (axios.post, etc)
    navigate('/formularioAbarrotes.jsx');
  };

  return (
    <>
      <FormContainer
        title="Formulario de Abastecimiento"
        size="md"
        onSubmit={e => e.preventDefault()}
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
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Cantidad de personas"
              name="personas"
              type="number"
              min="1"
              value={formData.personas}
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
              name="comida"
              value={formData.comida}
              onChange={handleChange}
              options={opcionesComida}
              optionLabel="nombre"
              optionValue="value"
              required
            />
          </div>
          
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="flex-1 flex gap-4">
            <SubmitButton
              type="button"
              width="w-full"
              color="text-white"
              onClick={handleGuardar}
              loading={loading}
              style={{
                backgroundColor: guardado ? '#059669' : undefined,
              }}
            >
              {guardado ? 'Guardado' : 'Guardar'}
            </SubmitButton>
            <SubmitButton
              type="button"
              width="w-full"
              color="text-white"
              onClick={handleEnviar}
            >
              Enviar
            </SubmitButton>
          </div>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}

export default FormularioAbastecimiento;