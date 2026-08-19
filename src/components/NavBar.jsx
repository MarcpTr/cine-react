// NavBar.jsx

import { NavLink } from "react-router-dom";
import NavBarElement from "./NavBarElement";
import "../styles/NavBar.css";

function NavBar() {
  const urls = [
    {
      name: "inicio",
      url: "/",
      svgI:
        "M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9Zm5 8.5h8v-5H8v5Z",
    },
    {
      name: "buscar",
      url: "/search",
      svgI:
        "m20.7 19.3-4.2-4.2a7.5 7.5 0 1 0-1.4 1.4l4.2 4.2a1 1 0 0 0 1.4-1.4ZM5 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z",
    },
    {
      name: "perfil",
      url: "/profile",
      svgI:
        "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z",
    },
  ];

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-inner">

          <NavLink to="/" className="brand">
            <span className="brand-icon">C</span>
            <span>
              Cine <strong>React</strong>
            </span>
          </NavLink>

          <ul className="nav-links">
            {urls.map((el) => (
              <li key={el.name}>
                <NavBarElement
                  url={el.url}
                  name={el.name}
                  svgI={el.svgI}
                />
              </li>
            ))}
          </ul>

        </div>
      </nav>
    </header>
  );
}

export default NavBar;