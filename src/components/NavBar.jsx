import NavBarElement from "./NavBarElement";

function NavBar() {
  const urls = [
    { name: "inicio", url: "" },
    { name: "buscar", url: "search" },
    { name: "perfil", url: "profile" },
  ];
  return (
    <nav className="bg-gray-800 p-4"> 
        <div class="container mx-auto flex justify-between items-center">
        <a href="#" class="text-xl font-semibold"> CineWeb
        </a>
      <ul class="flex space-x-6">
        {urls.map((el, i) => (
          <NavBarElement key={i} url={el.url} name={el.name}></NavBarElement>
        ))}
      </ul>
      </div>
    </nav>
  );
}

export default NavBar;
