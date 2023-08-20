import NavBarElement from "./NavBarElement";
import movieLogo from "../assets/movie.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
function NavBar() {
    const urls = [
        { name: "inicio", url: "" },
        { name: "buscar", url: "search" },
    ];
      const [navbarState, setNavbarState] = useState(true);
      const showNavbar = () => {
          setNavbarState(!navbarState);
      };
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <Link
                to="/"
                className="flex items-center flex-shrink-0 text-white mr-6"
            >
                <img className="w-6 mr-6" src={movieLogo} />
                <span className="font-semibold text-xl tracking-tight">
                    The movie web
                </span>
            </Link>
            <div className="block lg:hidden">
                <button
                    onClick={showNavbar}
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={
                    (navbarState ? "hidden " : "visible ") +
                    "w-full block flex-grow lg:flex lg:items-center lg:w-auto"
                }
            >
                <div className="text-sm lg:flex-grow space-y-0">
                    {urls.map((el, i) => (
                        <NavBarElement
                            key={i}
                            url={el.url}
                            name={el.name}
                        ></NavBarElement>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
