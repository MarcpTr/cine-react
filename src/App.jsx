import NavBar from "./components/NavBar";
import Profile from "./views/Profile";
import Trends from "./views/Trends";
import Search from "./views/Search";
import Info from "./views/Info";
import PageNotFound from "./views/PageNotFound";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
export const userContext = React.createContext();

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setUser(null);
                console.log("NO HAY NINGUN USUARIO");
                return null;
            }                
            console.log("USUARIO ENCONTRADO");
            setUser(user);
        });
    }, []);
    return (
        <>
            <userContext.Provider value={user}>
                <header>
                    <NavBar></NavBar>
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<Trends title="Tendencias" />}
                        />
                        <Route
                            path="/search"
                            element={<Search title="Buscar" />}
                        />
                        <Route
                            path="/info/:movieid"
                            element={<Info title="Informacion" />}
                        />
                        <Route
                            path="/profile"
                            element={<Profile title="Perfil" />}
                        />
                        <Route
                            path="*"
                            element={<PageNotFound title="No se encontro" />}
                        />
                    </Routes>
                </main>
            </userContext.Provider>
        </>
    );
}
export default App;
