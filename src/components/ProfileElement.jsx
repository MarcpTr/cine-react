import React, { useState } from "react";

import {
    removeCurrentUser,
    signInWithGoogle,
    logout,
} from "../firebase";

import "../styles/Profile.css";
import movieLogo from "../assets/movie.svg";

function ProfileElement({ user }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error iniciando sesión:", error);

            setError("No se pudo iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);

        try {
            await logout();
        } catch (error) {
            console.error("Error cerrando sesión:", error);

            setError("No se pudo cerrar la sesión.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "¿Seguro que quieres eliminar la cuenta?"
        );

        if (!confirmed) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await removeCurrentUser();
        } catch (error) {
            console.error(
                "Error eliminando la cuenta:",
                error
            );

            setError(
                "No se pudo eliminar la cuenta. Es posible que necesites volver a iniciar sesión."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="profile-main-logged">
                <section className="auth-card">
                    <div className="auth-header">
                        <span className="auth-label">
                            Cine React
                        </span>

                        <h1>Bienvenido</h1>

                        <p>
                            Inicia sesión para acceder a tu perfil
                            y disfrutar de todas las funciones de
                            Cine React.
                        </p>
                    </div>

                    <div className="auth-actions">
                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={loading}
                            className="google-button"
                        >
                            <span className="google-icon">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    loading="lazy"
                                    alt=""
                                />
                            </span>

                            <span>
                                {loading
                                    ? "Iniciando sesión..."
                                    : "Continuar con Google"}
                            </span>
                        </button>
                    </div>

                    {error && (
                        <p
                            className="auth-error"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <p className="auth-privacy">
                        Al continuar, aceptas los términos y
                        condiciones del servicio.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="profile-main">
            <section className="profile-header">
                <div className="profile-user">
                    <img
                        className="profile-avatar"
                        src={user.photoURL || movieLogo}
                        alt={`Avatar de ${user.displayName || "usuario"}`}
                    />

                    <div className="profile-user-info">
                        <h1>
                            {user.displayName || "Usuario"}
                        </h1>

                        <p>{user.email}</p>
                    </div>
                </div>

                <div className="profile-actions">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="logout-button"
                        disabled={loading}
                    >
                        Cerrar sesión
                    </button>

                    <button
                        onClick={handleDeleteAccount}
                        type="button"
                        className="delete-button"
                        disabled={loading}
                    >
                        Eliminar cuenta
                    </button>
                </div>
            </section>

            {error && (
                <p
                    className="auth-error"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default ProfileElement;