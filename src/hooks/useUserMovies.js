import { useCallback, useEffect, useState } from "react";

import {
    addMovieToList,
    getUserMovies,
    removeMovieFromList,
} from "../services/userMovies";

export function useUserMovies(user) {
    const [movies, setMovies] = useState({
        liked: [],
        watched: [],
        watchlist: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadMovies = useCallback(async () => {
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
            const data = await getUserMovies(user.uid);
            setMovies(data);
        } catch (error) {
            console.error("Error cargando las listas:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    const addMovie = async (listName, movie) => {
        if (!user) {
            throw new Error("Debes iniciar sesión.");
        }

        await addMovieToList(user.uid, listName, movie);

        await loadMovies();
    };

    const removeMovie = async (listName, movieId) => {
        if (!user) {
            throw new Error("Debes iniciar sesión.");
        }

        await removeMovieFromList(user.uid, listName, movieId);

        await loadMovies();
    };

    const isInList = (listName, movieId) => {
        return movies[listName]?.some(
            (movie) => Number(movie.id) === Number(movieId)
        );
    };

    return {
        movies,
        loading,
        error,
        addMovie,
        removeMovie,
        isInList,
        reload: loadMovies,
    };
}