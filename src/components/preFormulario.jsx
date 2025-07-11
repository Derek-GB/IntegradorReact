
import FormularioEvento from "./FormularioEvento";
import "../styles/formularioFusionado.css";


const preFormulario = () => {
  return (
    <>

   
      <div className="preContainer contenido-principal">
        <h2>
          Registro de familias
        </h2>
        <FormularioEvento />
      </div>
    </>
  );
};

export default preFormulario;