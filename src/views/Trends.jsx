import Pagination from "../components/Pagination";
import TrendSelector from "../components/TrendSelector";
import Gallery from "../components/Gallery";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function Trends({title}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [timeWindow, setTimeWindow] = useState("day");
    const [actualPage, setActualPage] = useState(1);

    const handleTimeWindow = (value) => {
        setTimeWindow(value);
        navigate("?time=" + value + "&page=" + actualPage);
    };
    const handlePage = (value) => {
        setActualPage(value);
        navigate("?time=" + timeWindow + "&page=" + value);
    };
    document.title=title;
    const api_key = "b7048181b82a3678ad874fa00559a427";
    const language = "es-Es";
    const type_media = "movie";
    const API_URL = `https://api.themoviedb.org/3/trending/`;
    const firstPage=1;
    const lastPage=10;
    const fetchData = () => {
          if (actualPage < firstPage && actualPage > lastPage) {
              setActualPage(1);
          }

        const url = `${API_URL}${type_media}/${timeWindow}?language=${language}&api_key=${api_key}&page=${Number(
            actualPage
        )}`;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data_movies) => {
                setMovies(data_movies.results);
                setIsLoading(false);
            })
            .catch((e) => console.log("Error: " + e));
    };
    useEffect(() => {
        fetchData();
    }, [timeWindow, actualPage]);

    useEffect(() => {
        const page = searchParams.get("page");
        const time = searchParams.get("time");
        console.log("page: " + page + " time:" + time);
        if (page >= firstPage && page < 10) {
            setActualPage(page);
        } else setActualPage(firstPage);
        if (time == "day" || time == "week") {
            setTimeWindow(time);
        }else setTimeWindow("day")

        fetchData();
    }, []);
    return (
        <>
            <Pagination
                onChange={handlePage}
                paginationPage={actualPage}
                totalPages={lastPage}
                maxPages={lastPage}
                firstPage={firstPage}
            />
            <TrendSelector onChange={handleTimeWindow}></TrendSelector>
            {isLoading ? <p>Loading</p> : <Gallery movies={movies} />}
        </>
    );
}

export default Trends;
