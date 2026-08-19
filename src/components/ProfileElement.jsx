import React from "react";
import movieLogo from "../assets/movie.svg";
import { SignOut, DeleteUser, SignUp } from "../firebase";
import "../styles/Profile.css"
function ProfileElement({ user }) {
    return (
        <div class={user ? "profile-main" : "profile-main-logged"}>
            {user ? (
                <>
                    <section class="profile-header">
                        <div class="profile-user">
                            <img
                                class="profile-avatar"
                                src={user ? user.photoURL : movieLogo}
                                alt="profile picture"
                            />

                            <div class="profile-user-info">
                                <h1>{user ? user.displayName : ""}</h1>
                                <p>{user ? user.email : ""}</p>
                            </div>
                        </div>

                        <div class="profile-actions">
                            <button onClick={SignOut} type="button" class="logout-button">
                                Cerrar sesión
                            </button>

                            <button onClick={DeleteUser} type="button" class="delete-button">
                                Eliminar cuenta
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <section class="auth-card">
                    <div class="auth-header">
                        <span class="auth-label">Cine React</span>

                        <h1>Bienvenido</h1>

                        <p>
                            Inicia sesión para acceder a tu perfil y disfrutar de todas
                            las funciones de Cine React.
                        </p>
                    </div>

                    <div class="auth-actions">
                        <button
                            onClick={SignUp} class="google-button">
                            <span class="google-icon">
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    loading="lazy"
                                    alt=""
                                />
                            </span>

                            <span>Continuar con Google</span>
                        </button>
                    </div>
                    <p class="auth-privacy">
                        Al continuar, aceptas los términos y condiciones del servicio.
                    </p>
                </section>
            )}
        </div>
    );
}

export default ProfileElement;
