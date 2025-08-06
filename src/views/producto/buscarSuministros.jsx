import React, { useState } from "react";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../../components/globalComponents/CustomToaster.jsx";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable.jsx";
import { productosAPI } from "../../helpers/api.js";
import toast from "react-hot-toast";

const BuscarSuministros = () => {
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigoFamilia.trim()) {
      toast.error("Debe ingresar un código de familia.");
      return;
    }

    setLoading(true);
    setResultados([]); // Limpia resultados previos

    try {
      const data = await productosAPI.getByFamilia(codigoFamilia);
      console.log("Datos recibidos:", data);
      setResultados(data.data);
    } catch (error) {
      toast.error(error.message || "Error al buscar productos.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { name: "Código Producto", selector: row => row.codigoProducto, sortable: true },
    { name: "Nombre Producto", selector: row => row.nombreProducto },
    { name: "Descripción", selector: row => row.descripcion },
    { name: "Cantidad Asignada", selector: row => row.cantidadAsignada },
    { name: "Persona Asignada", selector: row => row.personaAsignada },
    { name: "Código Familia", selector: row => row.codigoFamilia },
  ];

  return (
    <>
      <FormContainer title="Búsqueda de Suministro" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Código Familia"
              name="codigoFamilia"
              value={codigoFamilia}
              onChange={(e) => setCodigoFamilia(e.target.value)}
              placeholder="Ingrese el código de familia"
            />
          </div>

          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading} color="text-black">
              Buscar
            </SubmitButton>
          </div>
        </div>

        {resultados.length > 0 && (
          <div className="mt-8">
            <GlobalDataTable
              columns={columns}
              data={resultados}
              loading={loading}
              rowsPerPage={5}
            />
          </div>
        )}

        {resultados.length === 0 && !loading && (
          <p className="mt-6 text-center text-gray-500">
            Ingrese un código y presione Buscar para ver resultados.
          </p>
        )}
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default BuscarSuministros;
