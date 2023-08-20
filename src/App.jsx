import NavBar from "./components/NavBar";
import Trends from "./views/Trends";
import Search from "./views/Search";
import Info from "./views/Info";
import PageNotFound from "./views/PageNotFound";
import { Route, Routes } from "react-router-dom";
function App() {
   

    return (
        <>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Trends />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/info/:movieid" element={<Info />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
