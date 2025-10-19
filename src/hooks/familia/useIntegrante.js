  // Validación reutilizable para identificación
  const validarIdentificacion = (tipo, valor) => {
    if (tipo === "Cédula") {
      if (!/^\d{9}$/.test(valor)) return "La cédula debe tener 9 dígitos";
      return null;
    }
    if (tipo === "DIMEX") {
      if (!/^\d{12}$/.test(valor)) return "El DIMEX debe tener 12 dígitos";
      return null;
    }
    if (tipo === "Pasaporte") {
      if (!/^[A-Za-z0-9]{8,15}$/.test(valor)) return "El pasaporte debe ser alfanumérico entre 8 y 15 caracteres";
      return null;
    }
    return null;
  };
import { useState, useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

const paises = [
  "Belice", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
  "Nicaragua", "Panamá", "Argentina", "Venezuela", "Colombia"
];

const gruposIndigenasCR = [
  "Bribri", "Cabécar", "Maleku", "Guaymí (Ngäbe)", "Boruca", "Térraba", "Chorotega"
];

const useIntegrante = (datos = {}, setDatos) => {
  const [edad, setEdad] = useState("");
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  // Edad
  const calcularEdad = (fecha) => {
    if (!fecha) return "";
    const nacimiento = new Date(fecha);
    if (isNaN(nacimiento.getTime())) return "";
    const hoy = new Date();
    let edadCalc = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalc--;
    }
    return edadCalc;
  };

  // Handler general para todos los campos
  const handleChange = (e, section = "FamiliaDatosPersonales") => {
    let { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;

    // Validar número de identificación según tipo
    if (section === "FamiliaDatosPersonales" && name === "numeroIdentificacion") {
      const tipo = datos.FamiliaDatosPersonales?.tipoIdentificacion || "Cédula";
      if (tipo === "Cédula") {
        value = value.replace(/\D/g, "").slice(0, 9);
      } else if (tipo === "DIMEX") {
        value = value.replace(/[^\d]/g, "").slice(0, 12);
      } else if (tipo === "Pasaporte") {
        value = value.replace(/[^A-Za-z0-9]/g, "").slice(0, 15);
      }
    }

    setDatos(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: section === "FamiliaDatosPersonales" && name === "numeroIdentificacion" ? value : nuevoValor,
        ...(name === "fechaNacimiento"
          ? { edad: calcularEdad(value) }
          : {}),
      },
    }));

    if (section === "FamiliaDatosPersonales" && name === "fechaNacimiento") {
      setEdad(calcularEdad(value));
    }
  };

  // Firma digital
  useEffect(() => {
    if (canvasRef.current) {
      if (signaturePadRef.current) {
        signaturePadRef.current.off();
        signaturePadRef.current = null;
      }
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        penColor: "black",
      });
    }
    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.off();
        signaturePadRef.current = null;
      }
    };
  }, [canvasRef.current, datos.FamiliaDatosPersonales?.esJefeFamilia]);

  const guardarFirma = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imagen = canvas.toDataURL("image/png");
      setDatos(prev => ({
        ...prev,
        FamiliaFirmaDigital: {
          ...prev.FamiliaFirmaDigital,
          imagen,
        },
      }));
    }
  };

  const limpiarFirma = () => {
    signaturePadRef.current?.clear();
    setDatos(prev => ({
      ...prev,
      FamiliaFirmaDigital: {
        ...prev.FamiliaFirmaDigital,
        imagen: null,
      },
    }));
  };

  
  useEffect(() => {
    if (!datos.FamiliaDatosPersonales?.tipoIdentificacion) {
      setDatos(prev => ({
        ...prev,
        FamiliaDatosPersonales: {
          ...prev.FamiliaDatosPersonales,
          tipoIdentificacion: "Cédula",
        },
      }));
    }
  }, []);

  
  const validarIntegrante = (dp) => {
    if (!dp.nombre?.trim()) return "Falta el nombre.";
    if (!dp.numeroIdentificacion?.trim()) return "Falta el número de identificación.";
    if (!dp.tipoIdentificacion?.trim()) return "Falta el tipo de identificación.";
    // Validación de formato
    const errorIdent = validarIdentificacion(dp.tipoIdentificacion, dp.numeroIdentificacion);
    if (errorIdent) return errorIdent;
    return null;
  };

  return {
    edad,
    handleChange,
    paises,
    gruposIndigenasCR,
    canvasRef,
    signaturePadRef,
    guardarFirma,
    limpiarFirma,
    calcularEdad,
    validarIntegrante,
    validarIdentificacion,
  };
};

export default useIntegrante;
