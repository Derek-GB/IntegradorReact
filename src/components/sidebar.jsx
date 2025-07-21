import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/sidebar.css'; // Asegúrate de que la ruta sea

const Sidebar = () => {
  const links = [
    // Enlaces principales
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/preFormulario.jsx", icon: "groups", label: "Familia" },
    { href: "/registroSuministros.jsx", icon: "inventory_2", label: "Suministros" },
    { href: "/asignacionRecursos.jsx", icon: "volunteer_activism", label: "Asignación" },
    { href: "/busquedaAlbergue.jsx", icon: "hotel", label: "Albergues" },
    { href: "/ayudaForm.jsx", icon: "fact_check", label: "Referencias" },
    { href: "/registrarConsumibles.jsx", icon: "inventory", label: "Consumibles" },
    { href: "/registroAlbergue.jsx", icon: "business", label: "Albergue" },
    { href: "/registroUsuario.jsx", icon: "person_add", label: "Usuario" },
    { href: "/listaProducto.jsx", icon: "list", label: "Suministros" },
    { href: "/menuPrincipal", icon: "local_shipping", label: "Abastecimiento" },
    { href: "/familiaFormulario.jsx", icon: "family_restroom", label: "Integrante" },
    { href: "/registroMascota.jsx", icon: "pets", label: "Mascotas" },
    { href: "/registroAmenazas.jsx", icon: "report", label: "Amenazas" },
    { href: "/ActualizarAlbergue.jsx", icon: "report", label: "Albergue" },
    { href: "/ajusteInventario.jsx", icon: "warehouse", label: "Ajuste inventario" },
    { href: "/BusquedaFamilia.jsx", icon: "search", label: "Familias" }
  ];





  // Agrupar los enlaces por categorías
  const groupedLinks = [
    {
      label: "Registrar",
      icon: "inventory_2",
      items: links.filter(link =>
        [
          "registrar",
          "suministros",
          "asignacion",
          "referencias",
          "integrante",
          "consumibles",
          "usuario",
          "mascotas",
          "amenazas",
          "abastecimiento"
        ].some(keyword =>
          link.label.toLowerCase().includes(keyword)
        ) ||
        ["/preformulario.jsx", "/registroalbergue.jsx"].some(path =>
          link.href.toLowerCase().includes(path)
        )
      )
    },
    {
      label: "Listar",
      icon: "list",
      items: links.filter(link =>
        [
          "/listaproducto.jsx",
          "/actualizaralbergue.jsx"
        ].some(keyword =>
          link.href.toLowerCase().includes(keyword)
        )
      )
    },
    {
      label: "Consultar",
      icon: "search",
      items: links.filter(link =>
        [
          "/busquedaalbergue.jsx",
          "/busquedafamilia.jsx"
        ].some(keyword =>
          link.href.toLowerCase().includes(keyword)
        )
      )
    },
    {
      label: "Otros",
      icon: "more_horiz",
      items: links.filter(link =>
        [
          "ajuste inventario"
        ].some(keyword =>
          link.label.toLowerCase().includes(keyword)
        )
      )
    }
  ];


  const [openGroup, setOpenGroup] = useState(null);

  const handleGroupClick = (idx) => {
    setOpenGroup(openGroup === idx ? null : idx); // Toggle: abre/cierra el grupo
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>


          <li>
            <Link to={links[0].href}>
              <span className="material-icons">{links[0].icon}</span>
              <span className="spanTitulo">{links[0].label}</span>

            </Link>
          </li>
          {/* Grupos */}
          {groupedLinks.map((group, idx) =>
            group.items.length > 0 && group.label !== "Inicio" ? (
              <li
                key={group.label + idx}
                className={openGroup === idx ? "open" : ""}
                onClick={() => handleGroupClick(idx)}
              >
                <div className="sidebar-group-header">
                  <span className="material-icons">{group.icon}</span>
                  <span className="spanTitulo">{group.label}</span>
                  <span className="material-icons expand-icon">
                    {openGroup === idx ? "expand_less" : "expand_more"}
                  </span>
                </div>
                <ul style={{ display: openGroup === idx ? "block" : "none" }}>
                  {group.items.map((link, index) => (
                    <li key={link.href + index}>
                      <Link
                        to={link.href}
                        onClick={() => setOpenGroup(null)} // Cierra el submenú al navegar
                      >
                        <span className="material-icons">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null
          )}
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