import React, { useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useMovieListStatus } from "../hooks/useMovieListStatus";

import "../styles/AddTo.css";

function AddTo({
    id,
    posterPath,
    title,
    release_date,
}) {
    const { user } = useAuth();

    const {
        status,
        loading,
        processing,
        error,
        toggle,
    } = useMovieListStatus(user, id);

    const [message, setMessage] = useState(null);

    const movie = {
        id,
        posterPath,
        title,
        release_date,
    };

    const handleToggle = async (list) => {
        if (!user) {
            setMessage(
                "Inicia sesión para guardar películas."
            );

            return;
        }

        setMessage(null);

        try {
            await toggle(list, movie);
        } catch {
            setMessage(
                "No se pudo actualizar la lista."
            );
        }
    };

    if (!user) {
        return (
            <div className="actions">
                <button
                    type="button"
                    onClick={() =>
                        setMessage(
                            "Inicia sesión para guardar películas."
                        )
                    }
                >
                    Me gusta
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setMessage(
                            "Inicia sesión para guardar películas."
                        )
                    }
                >
                    Vista
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setMessage(
                            "Inicia sesión para guardar películas."
                        )
                    }
                >
                    Pendiente
                </button>

                {message && (
                    <p
                        className="actions-message"
                        role="alert"
                    >
                        {message}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="actions">
            <button
                type="button"
                onClick={() =>
                    handleToggle("liked")
                }
                disabled={
                    loading ||
                    processing !== null
                }
                aria-pressed={status.liked}
            >
                {processing === "liked"
                    ? "Guardando..."
                    : status.liked
                    ? "Quitar me gusta"
                    : "Me gusta"}
            </button>

            <button
                type="button"
                onClick={() =>
                    handleToggle("watched")
                }
                disabled={
                    loading ||
                    processing !== null
                }
                aria-pressed={status.watched}
            >
                {processing === "watched"
                    ? "Guardando..."
                    : status.watched
                    ? "Quitar de vistas"
                    : "Vista"}
            </button>

            <button
                type="button"
                onClick={() =>
                    handleToggle("watchlist")
                }
                disabled={
                    loading ||
                    processing !== null
                }
                aria-pressed={status.watchlist}
            >
                {processing === "watchlist"
                    ? "Guardando..."
                    : status.watchlist
                    ? "Quitar de mi lista"
                    : "Pendiente"}
            </button>

            {(message || error) && (
                <p
                    className="actions-message"
                    role="alert"
                >
                    {message ||
                        "No se pudieron cargar las listas."}
                </p>
            )}
        </div>
    );
}

export default AddTo;