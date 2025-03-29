import { NavLink } from "react-router-dom";
function NavBarElement({ name, url }) {
    return (
        <NavLink
            to={"/" + url}
            className="hover:text-gray-400"
        > 
            {name}
        </NavLink>
    );
}

export default NavBarElement;
