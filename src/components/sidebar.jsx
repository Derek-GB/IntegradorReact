import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/preFormulario.jsx", icon: "groups", label: "Familia" },
    { href: "/registroSuministros.jsx", icon: "shelves", label: "Suministros" },
    { href: "/asignacionRecursos.jsx", icon: "volunteer_activism", label: "Asignación" },
    { href: "/busquedaAlbergue.jsx", icon: "hotel", label: "Albergues" },
    { href: "/ayudaForm.jsx", icon: "fact_check", label: "Referencias" },
    { href: "/registrarConsumibles.jsx", icon: "local_dining", label: "Consumibles" },
    { href: "/registroAlbergue.jsx", icon: "hotel", label: "Albergue" },
    { href: "/registroUsuario.jsx", icon: "person_add", label: "Usuario" },
    { href: "/listaProducto.jsx", icon: "shelves", label: "Suministros" },
    { href: "/menuPrincipal", icon: "local_shipping", label: "Abastecimiento" },
    { href: "/familiaFormulario.jsx", icon: "family_restroom", label: "Integrante" },
    { href: "/registroMascota.jsx", icon: "pets", label: "Mascotas" },
    { href: "/registroAmenazas.jsx", icon: "report", label: "Amenazas" },
    { href: "/ActualizarAlbergue.jsx", icon: "business", label: "Albergue" },
    { href: "/ajusteInventario.jsx", icon: "warehouse", label: "Ajuste inventario" },
    { href: "/BusquedaFamilia.jsx", icon: "groups", label: "Familias" }
  ];

  const groupedLinks = [
    {
      label: "Registrar",
      icon: "inventory_2",
      items: links.filter(link =>
        [
          "registrar",
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
        ["/preformulario.jsx", "/registroalbergue.jsx", "/registrosuministros.jsx"].some(path =>
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
    <>
      <style>{`
        /* --- SIDEBAR RETRAÍDO Y EXPANDIBLE --- */
        .sidebar {
          position: fixed;
          margin-top: 0;
          left: 0;
          width: 55px;
          height: 100vh;
          background: var(--color-verde-form);
          color: #fff;
          padding-top: 60px;
          z-index: 1000;
          overflow: visible;
          display: flex;
          flex-direction: column;
          /* transition: width 0.3s cubic-bezier(.4,2,.6,1); */
        }
        .sidebar nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          top: 8px;
          width: 120%;
        }
        .sidebar nav ul li {
          position: relative;
          margin: 8px 0;
          width: 100%;
        }
        /* Submenú oculto por defecto */
        .sidebar nav ul li ul {
          display: none;
          position: static;
          top: unset;
          left: unset;
          min-width: fit-content;
          width: 50%;
          background: var(--color-verde-form);
          color: #fff;
          border-radius: 8px;
          box-shadow: none;
          padding: 0;
          margin-top: 0;
          z-index: 1001;
        }
        /* Mostrar submenú al hacer hover en el li padre */
        .sidebar nav ul li:hover > ul,
        .sidebar nav ul li:focus-within > ul {
          display: block;
        }
        /* Estilo de los items del submenú */
        .sidebar nav ul li ul li {
          margin: 0;
          width: fit-content;
        }
        .sidebar nav ul li ul li:hover {
          color: var(--color-texto);
        }
        .sidebar nav ul li ul li a {
          display: flex;
          align-items: center;
          padding: 10px 18px 10px 38px;
          color: #fff;
          font-size: 1rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
          width: fit-content;
        }
        /* Opcional: iconos más pequeños en submenú */
        .sidebar nav ul li ul li a .material-icons {
          font-size: 1.2rem;
          margin-right: 10px;
        }
        /* Responsive: submenú debajo en móvil */
        @media (max-width: 700px) {
          .sidebar nav ul li ul {
            position: static;
            min-width: unset;
            box-shadow: none;
            border-radius: 0;
            padding: 0;
          }
        }
        .sidebar nav ul li a {
          display: flex;
          align-items: center;
          font-size: 1rem;
          padding: 5px 6px;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
          overflow: hidden;
        }
        .sidebar nav ul li a .material-icons {
          font-size: 1.8rem;
          min-width: 24px;
          text-align: center;
          margin-left: 10px;
          margin-right: 16px;
        }
        .sidebar {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--color-verde-form) var(--color-verde-form);
        }
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background: var(--color-amarillo);
          border-radius: 4px;
        }
        .sidebar::-webkit-scrollbar-track {
          background: var(--color-verde-form);
        }
        .sidebar nav ul li:hover {
          color: var(--color-amarillo-hover);
        }
        /* Oculta el texto de los enlaces cuando está retraído */
        .sidebar:not(:hover) nav ul li a span {
          transition: display 0.2s;
        }
        /* Expande el sidebar al hacer hover y muestra el texto */
        .sidebar:hover {
          min-width: none;
          width: 230px;
          transition: width 0.3s cubic-bezier(.4, 2, .6, 1);
        }
        .sidebar:hover nav ul li a span {
          display: inline;
        }
        .spanTitulo {
          display: inline-block;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-blanco);
          margin-left: 0px;
          transition: opacity 0.3s ease;
        }
        .sidebar:not(:hover) ul li.open > ul {
          display: none !important;
        }
        .sidebar nav ul a {
          width: 80%;
        }
        /* Sidebar expandido: muestra el texto */
        /* Sidebar retraído: oculta el texto */
        .sidebar:not(:hover) .spanTitulo {
          opacity: 0;
          display: none;
        }
        .sidebar:not(:hover) span.material-icons.expand-icon {
          display: none;
        }
        .sidebar-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          user-select: none;
          width: 50%;
          margin-left: 10px;
        }
        .sidebar-group-header span.material-icons {
          font-size: 1.8rem;
          min-width: 24px;
          text-align: center;
          margin-left: 7px;
          margin-right: 20px;
        }
        /* Ajusta el contenido principal para dejar espacio al sidebar */
        .main-content {
          margin-left: 55px;
          transition: margin-left 0.3s cubic-bezier(.4, 2, .6, 1);
        }
        .sidebar:hover ~ .main-content {
          margin-left: 1px;
        }
        /* Responsive: Sidebar ocupa toda la pantalla en móviles */
        @media (max-width: 700px) {
          .sidebar,
          .sidebar:hover {
            width: 100vw;
            height: auto;
            position: relative;
            min-height: unset;
            z-index: 200;
          }
          .main-content,
          .sidebar:hover ~ .main-content {
            margin-left: 0;
          }
        }
        /* Oculta el icono y el nombre del grupo cuando el sidebar está retraído */
        .sidebar:not(:hover) .sidebar-group-header span:not(.material-icons) {
          display: none;
        }
        /* Muestra el icono y el nombre del grupo cuando está expandido */
        .sidebar:hover .sidebar-group-header span:not(.expand-icon) {
          display: inline-flex !important;
        }
      `}</style>

      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={links[0].href}>
                <span className="material-icons">{links[0].icon}</span>
                <span className="spanTitulo">{links[0].label}</span>
              </Link>
            </li>
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
                          onClick={() => setOpenGroup(null)}
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
    </>
  );
};

export default Sidebar;
