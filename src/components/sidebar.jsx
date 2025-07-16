import { Link } from 'react-router-dom'
import React from 'react';
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea

const Sidebar = () => {
  const links = [
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/preFormulario", icon: "groups", label: "Registro de Familias" },
    { href: "/registroSuministros", icon: "inventory_2", label: "Registros de Suministros" },
    { href: "/asignacionRecursos", icon: "volunteer_activism", label: "Asignación de Suministros" },
    { href: "/busquedaAlbergue", icon: "hotel", label: "Consulta Albergues" },
    { href: "/ayudaForm", icon: "fact_check", label: "Revisión de Ayudas" },
    { href: "/registrarProducto", icon: "inventory", label: "Registrar un producto" },
    { href: "/registroAlbergue", icon: "business", label: "Registrar un albergue" },
    { href: "/registroUsuario", icon: "person_add", label: "Registrar un usuario" },
    { href: "/listaProducto.", icon: "list", label: "Lista de Productos" },
    { href: "/listaAlbergue", icon: "list_alt", label: "Lista de Albergues" },
    { href: "/menuPrincipal", icon: "warehouse", label: "menu Principal" },
    { href: "/formularioAbarrotes", icon: "local_shipping", label: "Abastecimiento" },
    { href: "/ajusteInventario", icon: "warehouse", label: "Ajuste de inventario" },
    { href: "/registroAmenazas", icon: "report", label: "Registro de Amenazas" }
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>
                <span className="material-icons">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


/* 
linkear {

public.index.html
head
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

}



css modificar iconos

.material-icons {
  font-size: 20px;
  vertical-align: middle;
  margin-right: 8px;
} */