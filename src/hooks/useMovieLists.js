import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    addMovieToList,
    getAllUserLists,
    removeMovieFromList,
} from "../services/movieLists";

export function useMovieLists(user) {
    const [movies, setMovies] = useState({
        liked: [],
        watched: [],
        watchlist: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadLists = useCallback(async () => {
        if (!user) {
            setMovies({
                liked: [],
                watched: [],
                watchlist: [],
            });

            return;
        }

        setLoading(true);
        setError(null);

        try {
            const lists = await getAllUserLists(
                user.uid
            );

            setMovies(lists);
        } catch (error) {
            console.error(
                "Error cargando las listas:",
                error
            );

            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadLists();
    }, [loadLists]);

    const addMovie = async (list, movie) => {
        await addMovieToList(
            user.uid,
            list,
            movie
        );

        setMovies((current) => ({
            ...current,
            [list]: [
                ...current[list],
                movie,
            ],
        }));
    };

    const removeMovie = async (
        list,
        movieId
    ) => {
        await removeMovieFromList(
            user.uid,
            list,
            movieId
        );

        setMovies((current) => ({
            ...current,
            [list]: current[list].filter(
                (movie) =>
                    Number(movie.id) !==
                    Number(movieId)
            ),
        }));
    };

    const isInList = (
        list,
        movieId
    ) => {
        return movies[list].some(
            (movie) =>
                Number(movie.id) ===
                Number(movieId)
        );
    };

    return {
        movies,
        loading,
        error,
        addMovie,
        removeMovie,
        isInList,
        reload: loadLists,
    };
}