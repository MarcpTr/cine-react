import Pagination from "../components/Pagination";
import Gallery from "../components/Gallery";
import SearchSelector from "../components/SearchSelector";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search({title}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isInit, setIsInit] = useState(false);

    const [movies, setMovies] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [queryPage, setQueryPage] = useState(1);
    const [paginationPage, setPaginationPage] = useState(null);
    const [totalPages, setTotalPages] = useState("0");

    const handlePage = (value) => {
        console.log("Search -> handlePage");
        setPaginationPage(value);
    };
    const handleSearch = (value) => {
        console.log("Search -> handleSearch");
        if (value != null && value != "") {
            setSearchQuery(value);
            navigate("?query=" + value);
        }
    };
    useEffect(() => {
        console.log("Search -> useEffect ->[]");
        const query = searchParams.get("query");
        if (query != null && query != "") {
            setSearchQuery(query);
            fetchData();
        }
    }, []);

    useEffect(() => {
        console.log("Search -> useEffect ->actualPage");
        if (searchQuery != null && searchQuery != "" && queryPage != null) {
            setQueryPage(paginationPage)
            fetchData();
        }
    }, [queryPage]);
    useEffect(() => {
        console.log("Search -> useEffect ->searchQuery");
        if (searchQuery != null && searchQuery != "") {
            setQueryPage(paginationPage);
            fetchData();
        }
    }, [searchQuery]);

    useEffect(()=>{
        if(paginationPage!=null)
        setQueryPage(paginationPage)
    },[paginationPage]);
        document.title = title;

    /**************************************/
    const api_key = "b7048181b82a3678ad874fa00559a427";
    const language = "es-Es";
    const type_media = "movie";
    const API_URL = `https://api.themoviedb.org/3/search/`;

    const fetchData = () => {
        console.log("fetchData -> " + queryPage + ", " + searchQuery);
        setIsInit(true);
        setIsLoading(true);
        console.log("pagina::::" + queryPage)
        const url = `${API_URL}${type_media}?&query=${searchQuery}&language=${language}&api_key=${api_key}&page=${queryPage}`;
                if (searchQuery != null && searchQuery != "")
                    fetch(url)
                        .then((response) => response.json())
                        .then((data_movies) => {
                            setTotalPages(data_movies.total_pages);
                            setMovies(data_movies.results);
                            setIsLoading(false);
                        })
                        .catch((e) => console.log("Error: " + e));
    };

    return (
        <>
            <SearchSelector handleSearch={handleSearch}></SearchSelector>
            <Pagination
                firstPage={1}
                onChange={handlePage}
                paginationPage={queryPage}
                totalPages={totalPages}
                maxPages={10}
            />
            {isInit ? (
                isLoading ? (
                    <p>Loading</p>
                ) : (
                    <>
                        <Gallery movies={movies} />
                    </>
                )
            ) : (
                <></>
            )}
            {}
        </>
    );
}

export default Search;
