import { useCallback, useEffect, useState } from "react";

import {
    addMovieToList,
    removeMovieFromList,
    isMovieInList,
} from "../services/movieLists";

const LISTS = ["liked", "watched", "watchlist"];

const EMPTY_STATUS = {
    liked: false,
    watched: false,
    watchlist: false,
};

export function useMovieListStatus(user, movieId) {
    const [status, setStatus] = useState(EMPTY_STATUS);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [error, setError] = useState(null);

    const loadStatus = useCallback(async () => {
        if (!user || !movieId) {
            setStatus(EMPTY_STATUS);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const values = await Promise.all(
                LISTS.map(async (list) => {
                    const exists = await isMovieInList(
                        user.uid,
                        list,
                        movieId
                    );

                    return [list, exists];
                })
            );

            setStatus(Object.fromEntries(values));
        } catch (error) {
            console.error(
                "Error comprobando las listas:",
                error
            );

            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user, movieId]);

    useEffect(() => {
        loadStatus();
    }, [loadStatus]);

    const toggle = async (list, movie) => {
        if (!user) {
            throw new Error(
                "Debes iniciar sesión para guardar películas."
            );
        }

        if (processing !== null) {
            return;
        }

        setProcessing(list);
        setError(null);

        try {
            if (status[list]) {
                await removeMovieFromList(
                    user.uid,
                    list,
                    movie.id
                );

                setStatus((current) => ({
                    ...current,
                    [list]: false,
                }));
            } else {
                await addMovieToList(
                    user.uid,
                    list,
                    movie
                );

                setStatus((current) => ({
                    ...current,
                    [list]: true,
                }));
            }
        } catch (error) {
            console.error(
                `Error actualizando ${list}:`,
                error
            );

            setError(error);

            throw error;
        } finally {
            setProcessing(null);
        }
    };

    return {
        status,
        loading,
        processing,
        error,
        toggle,
        reload: loadStatus,
    };
}