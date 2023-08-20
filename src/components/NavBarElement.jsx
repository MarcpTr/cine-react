import { NavLink } from "react-router-dom";
function NavBarElement({ name, url }) {
    return (
        <NavLink
            to={"/" + url}
            className={({ isActive }) => {
                return (
                    "block mt-4 lg:inline-block lg:mt-0 py-2 px-4 text-teal-200 hover:text-white mr-4 " +
                    (isActive ? "bg-teal-400 " : undefined)
                );
            }}
        >
            {name}
        </NavLink>
    );
}

export default NavBarElement;
