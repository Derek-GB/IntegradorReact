import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento.jsx';

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

export const useAbarrotesMenuPrincipal = () => {
    const navigate = useNavigate();
    const { guardarDatosFormulario } = useContext(contextoAbastecimiento);

    const [formData, setFormData] = useState({
        fecha: '',
        tipo: '',
        cantidad: '',
        albergue: '',
    });

    const [loading, setLoading] = useState(false);

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
        setTimeout(() => {
            navigate('/formularioAbarrotes.jsx');
            setLoading(false);
        }, 2000);
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