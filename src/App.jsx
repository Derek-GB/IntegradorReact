import React from 'react';
import './styles/sidebar.css'; // asegúrate de que esta ruta sea correcta desde App.jsx
import './styles/formularioFusionado.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Login from './components/login.jsx';

import Inicio from './components/inicio.jsx';
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
import MenuPrincipal from './components/menuPrincipal.jsx';
import FormularioAbastecimiento from './components/formularioAbarrotes.jsx';
import AjusteInventario from "./components/ajusteInventario.jsx";
import RecuperarContrasena from './components/recuperarContrasena.jsx';
import RegistroAmenazas from './components/registroAmenazas.jsx';
import FamiliaFormulario from './components/familiaFormulario.jsx';
import FormularioIntegrantes from "./components/formularioIntegrantes.jsx";
import RegistroMascotas from "./components/registroMascota.jsx";
import BusquedaFamilia from './components/BusquedaFamilia.jsx';
import ResumenFinal from './components/resumenFinal';

import ActualizarAlbergue from './components/ActualizarAlbergue.jsx';


// Importa el proveedor de contexto aquí
import { AbastecimientoProvider } from './context/contextoAbastecimiento';

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
        <AbastecimientoProvider>

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
                <Route path="/registrarConsumibles.jsx" element={<RegistrarConsumible />} /> //
                <Route path="/registroAlbergue.jsx" element={<RegistroAlbergue />} />
                <Route path="/registroUsuario.jsx" element={<RegistroUsuario />} />
                <Route path="/listaProducto.jsx" element={<ListaProducto />} />
                <Route path="/listaAlbergue.jsx" element={<ListaAlbergue />} />
                <Route path="/menuPrincipal" element={<MenuPrincipal />} />
                <Route path="/formularioAbarrotes.jsx" element={<FormularioAbastecimiento />} />
                <Route path="/ajusteInventario.jsx" element={<AjusteInventario />} />
                <Route path="/familiaFormulario.jsx" element={<FamiliaFormulario />} />
                <Route path="/formularioIntegrantes.jsx" element={<FormularioIntegrantes />} />
                <Route path="/registroMascota.jsx" element={<RegistroMascotas />} />
                <Route path="/BusquedaFamilia.jsx" element={<BusquedaFamilia />} />
                <Route path="/ActualizarAlbergue.jsx" element={<ActualizarAlbergue idAlbergue={17} />} />
                <Route path="/registroAmenazas.jsx" element={<RegistroAmenazas />} />
                <Route path="/resumenFinal" element={<ResumenFinal />} />
              </Routes>
            </div>
          </div>
        </AbastecimientoProvider>
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
