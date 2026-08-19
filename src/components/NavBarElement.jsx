// NavBarElement.jsx

import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBarElement({ name, url, svgI }) {
  return (
    <NavLink to={url} className="nav-link">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={svgI} />
      </svg>

      <span>{name}</span>
    </NavLink>
  );
}

export default NavBarElement;