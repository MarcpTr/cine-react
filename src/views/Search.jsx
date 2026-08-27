import Pagination from "../components/Pagination";
import Gallery from "../components/Gallery";
import SearchSelector from "../components/SearchSelector";
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
    searchMovies,
} from "../services/api";

function Search({ title }) {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const [movies, setMovies] =
        useState([]);

    const [totalPages, setTotalPages] =
        useState(0);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const query =
        searchParams.get("query")?.trim() || "";

    const pageParam =
        Number(searchParams.get("page"));

    const currentPage =
        Number.isInteger(pageParam) &&
        pageParam >= 1
            ? pageParam
            : 1;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        let cancelled = false;

        if (!query) {
            setMovies([]);
            setTotalPages(0);
            setError(null);
            setIsLoading(false);
            return;
        }

        async function loadSearch() {
            setIsLoading(true);
            setError(null);

            try {
                const data =
                    await searchMovies(
                        query,
                        currentPage
                    );

                if (cancelled) {
                    return;
                }

                const content =
                    data?.content;

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
                    "Error buscando películas:",
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

        loadSearch();

        return () => {
            cancelled = true;
        };
    }, [query, currentPage]);

    const handleSearch = (value) => {
        const newQuery =
            value?.trim();

        if (!newQuery) {
            return;
        }

        navigate(
            `/search?query=${encodeURIComponent(
                newQuery
            )}&page=1`
        );
    };

    const handlePage = (page) => {
        const newPage = Number(page);

        if (
            !Number.isInteger(newPage) ||
            newPage < 1 ||
            newPage > totalPages
        ) {
            return;
        }

        navigate(
            `/search?query=${encodeURIComponent(
                query
            )}&page=${newPage}`
        );
    };

    return (
        <>
            <SearchSelector
                handleSearch={handleSearch}
            />

            {query && (
                <Pagination
                    firstPage={1}
                    onChange={handlePage}
                    paginationPage={currentPage}
                    totalPages={totalPages}
                    maxPages={10}
                />
            )}

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
            ) : query ? (
                <Gallery
                    movies={movies}
                />
            ) : null}
        </>
    );
}

export default Search;