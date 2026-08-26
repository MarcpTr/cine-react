import Pagination from "../components/Pagination";
import Gallery from "../components/Gallery";
import SearchSelector from "../components/SearchSelector";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function Search({ title }) {
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
        setPaginationPage(value);
    };
    const handleSearch = (value) => {
        if (value != null && value != "") {
            setSearchQuery(value);
            navigate("?query=" + value);
        }
    };
    useEffect(() => {
        const query = searchParams.get("query");
        if (query != null && query != "") {
            setSearchQuery(query);
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (searchQuery != null && searchQuery != "" && queryPage != null) {
            setQueryPage(paginationPage)
            fetchData();
        }
    }, [queryPage]);
    useEffect(() => {
        if (searchQuery != null && searchQuery != "") {
            setQueryPage(paginationPage);
            fetchData();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (paginationPage != null)
            setQueryPage(paginationPage)
    }, [paginationPage]);
    document.title = title;


    const api_key = "b7048181b82a3678ad874fa00559a427";
    const language = "es-Es";
    const type_media = "movie";
    const API_URL = `https://api.themoviedb.org/3/search/`;

    const fetchData = () => {
        setIsInit(true);
        setIsLoading(true);
        const url = `http://localhost:8083/api/data/search?query=${searchQuery}&page=${queryPage}`;
        console.log(url)
        if (searchQuery != null && searchQuery != "")
            fetch(url)
                .then((response) => response.json())
                .then((data_movies) => {
                    setTotalPages(data_movies.total_pages);
                    setMovies(data_movies.data.content.results);
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
                    <Spinner />
                ) : (
                    <>
                        <Gallery movies={movies} />
                    </>
                )
            ) : (
                <></>
            )}
            { }
        </>
    );
}

export default Search;
