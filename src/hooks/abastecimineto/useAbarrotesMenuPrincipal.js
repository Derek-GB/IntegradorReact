import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento.jsx';
import { pedidoConsumiblesAPI, alberguesAPI } from '../../helpers/api.js';

const opcionesComida = [
  { nombre: "Desayuno", value: "desayuno" },
  { nombre: "Almuerzo", value: "almuerzo" },
  { nombre: "Cena", value: "cena" },
];

export const useAbarrotesMenuPrincipal = () => {
  const navigate = useNavigate();
  const { guardarDatosFormulario } = useContext(contextoAbastecimiento);

  const [opcionesAlbergue, setOpcionesAlbergue] = useState([]);

  const [formData, setFormData] = useState({
    fecha: '',
    tipo: '',
    cantidad: '',
    albergue: '', // aquí guardamos el id (string) del albergue seleccionado
  });

  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  // Cargar albergues desde API al montar
  useEffect(() => {
    const cargarAlbergues = async () => {
      try {
        const res = await alberguesAPI.getAll();
        // Asumimos que res.data es el array de albergues
        const listaAlbergues = Array.isArray(res.data) ? res.data : [];
        const opciones = listaAlbergues.map(a => ({
          id: a.id,
          nombre: a.nombre,
        }));
        setOpcionesAlbergue(opciones);
        console.log("Opciones de albergue cargadas:", opciones);
      } catch (error) {
        console.error("Error cargando albergues:", error);
        showCustomToast("Error", "No se pudieron cargar los albergues", "error");
        setOpcionesAlbergue([]);
      }
    };
    cargarAlbergues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('handleChange - Evento:', name, value);

    // Si es albergue, guardar el valor como string pero lo convertiremos a número al enviar
    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
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
        cantidadPersonas: parseInt(cantidad, 10),
        idAlbergue: parseInt(albergue, 10), // convertir string a número aquí
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
