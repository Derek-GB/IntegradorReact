import React from 'react';// asegúrate de que esta ruta sea correcta desde App.jsx
import './styles/formularioFusionado.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';


//Familia
import PreFormulario from './views/familia/preFormulario.jsx';
import FamiliaFormulario from './views/familia/familiaFormulario.jsx';
import BusquedaFamilia from './views/familia/busquedaFamilia.jsx';

//Producto
import AsignacionRecursos from './views/producto/asignacionRecursos.jsx';
import ListaProducto from './views/producto/listaProducto.jsx';
import RegistrarConsumible from './views/producto/registrarConsumibles.jsx';
import RegistroSuministros from './views/producto/registrarSuministro.jsx';

//Usuario
import Login from './views/usuario/login.jsx';
import RecuperarContrasena from './views/usuario/recuperarContrasena.jsx';
import RegistroUsuario from './views/usuario/registroUsuario.jsx';

//Albergue

import ActualizarAlbergue from './views/albergue/ActualizarAlbergue.jsx';
import BusquedaAlbergue from './views/albergue/busquedaAlbergue.jsx';
import ListaAlbergue from './views/albergue/listaAlbergue.jsx';
import RegistroAlbergue from './views/albergue/registroAlbergue.jsx';

//abastecimiento
import MenuPrincipal from './views/abastecimiento/menuPrincipal.jsx';
import ResumenFinal from './views/abastecimiento/resumenFinal.jsx';


//Solos
import AjusteInventario from "./views/ajusteInventario.jsx";
import AyudaForm from './views/ayudaForm.jsx';
import FormularioAbastecimiento from './components/formularioAbarrotes.jsx';
import Inicio from './views/inicio.jsx';
import RegistroAmenazas from './views/registroAmenazas.jsx';
import RegistroMascotas from "./views/registroMascota.jsx";

//No categorizado
import FormularioIntegrantes from "./components/formularioIntegrantes.jsx";


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
          <div className="app-container min-h-screen min-w-full flex flex-col md:flex-row bg-[#DEF7E9]">
            <Sidebar />
            <div className="container main-content flex-1 w-full h-full p-4">
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

    </>
  );
};

export default App;
