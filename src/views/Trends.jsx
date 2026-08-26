import Pagination from "../components/Pagination";
import TrendSelector from "../components/TrendSelector";
import Gallery from "../components/Gallery";
import Spinner from "../components/Spinner";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    getTrendingMovies,
} from "../services/api";

function Trends({ title }) {
    const navigate = useNavigate();
    const [searchParams] =
        useSearchParams();

    const [movies, setMovies] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    const [timeWindow, setTimeWindow] =
        useState("day");

    const [actualPage, setActualPage] =
        useState(1);

    const firstPage = 1;
    const lastPage = 10;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        const time =
            searchParams.get("time");

        const page =
            Number(
                searchParams.get("page")
            );

        const validTime =
            time === "day" ||
            time === "week";

        const validPage =
            Number.isInteger(page) &&
            page >= firstPage &&
            page <= lastPage;

        setTimeWindow(
            validTime
                ? time
                : "day"
        );

        setActualPage(
            validPage
                ? page
                : firstPage
        );
    }, [searchParams]);

    useEffect(() => {
        let cancelled = false;

        async function loadTrending() {
            setIsLoading(true);
            setError(null);

            try {
                const data =
                    await getTrendingMovies(
                        timeWindow,
                        actualPage
                    );

                if (cancelled) {
                    return;
                }

                setMovies(
                    data?.content?.results ||
                    []
                );
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Error cargando tendencias:",
                    error
                );

                setMovies([]);
                setError(error);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadTrending();

        return () => {
            cancelled = true;
        };
    }, [timeWindow, actualPage]);

    const handleTimeWindow = (
        value
    ) => {
        if (
            value !== "day" &&
            value !== "week"
        ) {
            return;
        }

        setTimeWindow(value);
        setActualPage(1);

        navigate(
            `/?time=${value}&page=1`
        );
    };

    const handlePage = (
        value
    ) => {
        const page = Number(value);

        if (
            !Number.isInteger(page) ||
            page < firstPage ||
            page > lastPage
        ) {
            return;
        }

        setActualPage(page);

        navigate(
            `/?time=${timeWindow}&page=${page}`
        );
    };

    return (
        <>
            <Pagination
                onChange={handlePage}
                paginationPage={actualPage}
                totalPages={lastPage}
                maxPages={lastPage}
                firstPage={firstPage}
            />

            <TrendSelector
                onChange={handleTimeWindow}
            />

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <div
                    className="error-message"
                    role="alert"
                >
                    <p>
                        {error.message}
                    </p>
                </div>
            ) : (
                <Gallery
                    movies={movies}
                />
            )}
        </>
    );
}

export default Trends;