import Pagination from "../components/Pagination";
import TrendSelector from "../components/TrendSelector";
import Gallery from "../components/Gallery";
import Spinner from "../components/Spinner";

import { useEffect, useState } from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    getTrendingMovies,
} from "../services/api";

function Trends({ title }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const firstPage = 1;
    const maxPaginationPages = 10;

    const [totalPages, setTotalPages] =
        useState(0);

    const timeParam = searchParams.get("time");
    const pageParam = Number(searchParams.get("page"));

    const timeWindow =
        timeParam === "week"
            ? "week"
            : "day";

    const actualPage =
        Number.isInteger(pageParam) &&
            pageParam >= firstPage
            ? pageParam
            : firstPage;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        let cancelled = false;

        async function loadTrending() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getTrendingMovies(
                    timeWindow,
                    actualPage
                );

                if (cancelled) {
                    return;
                }

                const content = data?.content;

                setMovies(
                    content?.results || []
                );

                setTotalPages(
                    content?.total_pages || 0
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
                setTotalPages(0);
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

    const handleTimeWindow = (value) => {
        if (
            value !== "day" &&
            value !== "week"
        ) {
            return;
        }

        navigate(
            `/?time=${value}&page=1`
        );
    };

    const handlePage = (value) => {
        const page = Number(value);

        if (
            !Number.isInteger(page) ||
            page < firstPage ||
            page > totalPages
        ) {
            return;
        }

        navigate(
            `/?time=${timeWindow}&page=${page}`
        );
    };

    return (
        <>
            <TrendSelector
                onChange={handleTimeWindow}
            />
            <Pagination
                onChange={handlePage}
                paginationPage={actualPage}
                totalPages={totalPages}
                maxPages={maxPaginationPages}
                firstPage={firstPage}
            />

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <div
                    className="error-message"
                    role="alert"
                >
                    <p>{error.message}</p>
                </div>
            ) : (<Gallery movies={movies} />
            )}
        </>
    );
}

export default Trends;