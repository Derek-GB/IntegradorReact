import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento.jsx';
import { pedidoConsumiblesAPI } from '../../helpers/api.js';
import { alberguesAPI } from '../../helpers/api.js';

const opcionesComida = [
  { nombre: "Desayuno", value: "desayuno" },
  { nombre: "Almuerzo", value: "almuerzo" },
  { nombre: "Cena", value: "cena" },
];

const opcionesAlbergue=await alberguesAPI.getAll().then(data => {
    console.log("Cargando opciones de albergue:", data);
    const resultados = data.data.map(albergue => ({
    id: albergue.id,
    nombre: albergue.nombre
  }));
    console.log("Opciones de albergue cargadas:", resultados);
    return resultados;
}).catch(error => {
  console.error("Error cargando albergues:", error);
  return opcionesAlbergue; // Retorna las opciones por defecto en caso de error
});

export const useAbarrotesMenuPrincipal = () => {
  const navigate = useNavigate();
  const { guardarDatosFormulario } = useContext(contextoAbastecimiento);

  const [formData, setFormData] = useState({
    fecha: '',
    tipo: '',
    cantidad: '',
    albergue: '', // aquí guardaremos el id del albergue
  });

  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    console.log('useEffect - Inicializando formData');
    setFormData({
      fecha: '',
      tipo: '',
      cantidad: '',
      albergue: '',
    });
  }, []);

  const handleChange = (e) => {
    console.log('handleChange - Evento:', e.target.name, e.target.value);
    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      console.log('handleChange - formData actualizado:', updatedForm);
      return updatedForm;
    });
  };

  const handleSiguiente = async () => {
    console.log('handleSiguiente - formData al enviar:', formData);
    const { fecha, tipo, cantidad, albergue } = formData;

    if (!fecha || !tipo || !cantidad || !albergue) {
      console.warn('handleSiguiente - Falta completar campos:', { fecha, tipo, cantidad, albergue });
      showCustomToast('Error', 'Complete todos los campos', 'error');
      return;
    }

    try {
      setLoading(true);
      console.log('handleSiguiente - Preparando datos para API');

      const pedidoData = {
        fechaCreacion: fecha,
        tipoComida: tipo,
        cantidadPersonas: parseInt(cantidad),
        idAlbergue: parseInt(albergue),  // Aquí enviamos el ID, convertido a número
        idUsuarioCreacion: 1, // ID fijo o del usuario logueado
      };

      console.log('handleSiguiente - Datos enviados a API:', pedidoData);

      const pedidoCreado = await pedidoConsumiblesAPI.create(pedidoData);

      console.log('handleSiguiente - Respuesta API:', pedidoCreado);

      guardarDatosFormulario({
        ...formData,
        idPedido: pedidoCreado.id, // Guarda el ID para usarlo después
      });
      console.log('handleSiguiente - Datos guardados en contexto');

      showCustomToast('Éxito', 'Formulario guardado correctamente', 'success');

      setTimeout(() => {
        console.log('handleSiguiente - Navegando a formularioAbarrotes.jsx');
        navigate('/formularioAbarrotes.jsx');
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('handleSiguiente - Error al crear el pedido:', error);
      showCustomToast('Error', 'No se pudo guardar el formulario.', 'error');
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    today,
    opcionesComida,
    opcionesAlbergue,
    handleChange,
    handleSiguiente,
  };
};
