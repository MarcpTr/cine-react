import Pagination from "../components/Pagination";
import Gallery from "../components/Gallery";
import SearchSelector from "../components/SearchSelector";
import Spinner from "../components/Spinner";

import { useEffect, useState } from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    searchMovies,
} from "../services/api";

function Search({ title }) {
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);

    const [searchParams] =
        useSearchParams();

    const [movies, setMovies] =
        useState([]);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const query =
        searchParams.get("query")?.trim() || "";

    const pageParam =
        Number(searchParams.get("page"));

    const page =
        Number.isInteger(pageParam) &&
            pageParam >= 1
            ? pageParam
            : 1;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        async function loadMovies() {
            setIsLoading(true);
            setError(null);

            try {
                const data =
                    await searchMovies(
                        query,
                        page
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
                setError(error);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadMovies();

        return () => {
            cancelled = true;
        };
    }, [query, page]);

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

    const handlePage = (value) => {
        const newPage =
            Number(value);

        if (
            !Number.isInteger(newPage) ||
            newPage < 1
        ) {
            return;
        }

        if (!query) {
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
                    paginationPage={page}
                    totalPages={totalPages}
                    maxPages={10}
                />
            )}

            {!query ? null : isLoading ? (
                <Spinner />
            ) : error ? (
                <div
                    className="error-message"
                    role="alert"
                >
                    <p>{error.message}</p>
                </div>
            ) : (
                <Gallery movies={movies} />
            )}
        </>
    );
}

export default Search;