import NavBar from "./components/NavBar";
import Profile from "./views/Profile";
import Trends from "./views/Trends";
import Search from "./views/Search";
import Info from "./views/Info";
import PageNotFound from "./views/PageNotFound";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Trends title="Tendencias" />
                        }
                    />

                    <Route
                        path="/search"
                        element={
                            <Search title="Buscar" />
                        }
                    />

                    <Route
                        path="/info/:movieid"
                        element={
                            <Info title="Información" />
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <Profile title="Perfil" />
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <PageNotFound
                                title="No se encontró"
                            />
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;