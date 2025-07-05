import React from 'react';
import '../styles/formularioFusionado.css'
const Inicio = () => {
  return (
    <>
     

      {/* Contenido principal */}
      <div className="containerIndex main-content">
        <div className="bienvenida">
          <h1>Bienvenido al Sistema de Gestión de Albergues</h1>
          <br />
          <p className="intro">
            Este proyecto está en desarrollo para <strong>agilizar y eficientizar el registro de familias, suministros y albergues</strong> en situaciones de emergencia.<br />
            Nuestro objetivo es <strong>mitigar el tiempo de reacción</strong> y facilitar la atención rápida y ordenada de las personas afectadas.
          </p>
          <br />
          <ul className="ventajas">
            <li><span className="material-icons">groups</span> Registro rápido y seguro de familias</li>
            <li><span className="material-icons">inventory_2</span> Control eficiente de suministros</li>
            <li><span className="material-icons">hotel</span> Gestión centralizada de albergues</li>
            <li><span className="material-icons">bolt</span> Respuesta ágil ante emergencias</li>
          </ul>
          <div className="progreso">
            <br />
            <span className="badge">Proyecto en desarrollo</span>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </>
  );
};

export default Inicio;