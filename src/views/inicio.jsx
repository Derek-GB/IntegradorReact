import React from 'react';
import { useNavigate } from 'react-router-dom';
import authHelper from '../helpers/sesion'; // importa tu helper con login/logout

const Inicio = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authHelper.logout();  // limpia token e idUsuario
    navigate('/');        // redirige a login
  };

  return (
    <>
     

      {/* Contenido principal */}
      <div className="w-11/12 m-2 mt-16 bg-teal-600 rounded-2xl p-10 shadow-lg text-white">
        <div className="bienvenida">
          <h1 className="text-yellow-400 text-4xl font-bold text-center mb-6">
            Bienvenido al Sistema de Gestión de Albergues
          </h1>
          <p className="text-center text-lg mb-8">
            Este proyecto está en desarrollo para <strong>agilizar y eficientizar el registro de familias, suministros y albergues</strong> en situaciones de emergencia.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <li className="bg-white/10 rounded-xl p-5 flex items-center text-yellow-300 font-medium shadow">
              <span className="material-icons mr-3 text-yellow-400 text-2xl">groups</span>
              Registro rápido y seguro de familias
            </li>
            <li className="bg-white/10 rounded-xl p-5 flex items-center text-yellow-300 font-medium shadow">
              <span className="material-icons mr-3 text-yellow-400 text-2xl">inventory_2</span>
              Control eficiente de suministros
            </li>
            <li className="bg-white/10 rounded-xl p-5 flex items-center text-yellow-300 font-medium shadow">
              <span className="material-icons mr-3 text-yellow-400 text-2xl">hotel</span>
              Gestión centralizada de albergues
            </li>
            <li className="bg-white/10 rounded-xl p-5 flex items-center text-yellow-300 font-medium shadow">
              <span className="material-icons mr-3 text-yellow-400 text-2xl">bolt</span>
              Respuesta ágil ante emergencias
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Inicio;
