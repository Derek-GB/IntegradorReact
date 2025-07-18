import React from 'react';
import './styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Login from './components/login.jsx';

import Inicio from './components/Inicio.jsx';
import PreFormulario from './components/preFormulario.jsx';
import RegistroSuministros from './components/registrarSuministro.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/ayudaForm.jsx';
import RegistrarConsumible from './components/registrarConsumibles.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import RegistroUsuario from './components/registroUsuario.jsx';
import ListaProducto from './components/ListaProducto.jsx';
import ListaAlbergue from './components/ListaAlbergue.jsx';
import FormularioAbastecimiento from './components/FormularioAbarrotes.jsx';
import AjusteInventario from "./components/ajusteInventario";// <--- nombre correcto
import RecuperarContrasena from './components/recuperarContrasena';
import FamiliaFormulario from './components/familiaFormulario.jsx';
import FormularioIntegrantes from "./components/formularioIntegrantes";
import RegistroMascotas from "./components/registroMascota.jsx";
import VistaFamilia from './components/VistaFamilia.jsx'; 

const App = () => {
  const location = useLocation();
  const isLogin = 
    location.pathname === '/' || 
    location.pathname === '/recuperarContrasena.jsx';

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recuperarContrasena.jsx" element={<RecuperarContrasena />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="container main-content">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/preFormulario.jsx" element={<PreFormulario />} />
              <Route path="/registroSuministros.jsx" element={<RegistroSuministros />} />
              <Route path="/asignacionRecursos.jsx" element={<AsignacionRecursos />} />
              <Route path="/busquedaAlbergue.jsx" element={<BusquedaAlbergue />} />
              <Route path="/ayudaForm.jsx" element={<AyudaForm />} />
              <Route path="/registrarConsumibles.jsx" element={<RegistrarConsumible />} />
              <Route path="/registroAlbergue.jsx" element={<RegistroAlbergue />} />
              <Route path="/registroUsuario.jsx" element={<RegistroUsuario />} />
              <Route path="/listaProducto.jsx" element={<ListaProducto />} />
              <Route path="/listaAlbergue.jsx" element={<ListaAlbergue />} />
              <Route path="/formularioAbarrotes.jsx" element={<FormularioAbastecimiento />} />
              <Route path="/ajusteInventario.jsx" element={<AjusteInventario />} />
              <Route path="/familiaFormulario.jsx" element={<FamiliaFormulario />} />
              <Route path="/formularioIntegrantes.jsx" element={<FormularioIntegrantes />} />
              <Route path="/registroMascota.jsx" element={<RegistroMascotas />} />
              <Route path="/VistaFamilia.jsx" element={<VistaFamilia />} />              


            </Routes>
          </div>
        </div>
      )}

      {!isLogin && (
        <footer>
          <p>© 2025 Integrador I - Todos los derechos reservados.</p>
        </footer>
      )}
    </>
  );
};

export default App;
