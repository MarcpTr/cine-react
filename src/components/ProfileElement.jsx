import React from "react";
import movieLogo from "../assets/movie.svg";
import { SignOut, DeleteUser, SignUp } from "../firebase";
import "../styles/Profile.css"
function ProfileElement({ user }) {
    return (
        <div className="p-5  flex space-x-6">
            {user ? (
                <>
                    <img
                        className="rounded-full"
                        src={user ? user.photoURL : movieLogo}
                        alt="profile picture"
                    ></img>
                    <div className="flex place-items-center w-full space-x-8 ">
                        <div>
                            <h2 className="">{user ? user.displayName : ""}</h2>
                            <p className="">{user ? user.email : ""}</p>
                        </div>
                        <button
                            onClick={SignOut}
                            type="button"
                            className="rounded-2xl bg-red-500 px-4 py-2 font-bold leading-none text-white hover:border-slate-400  hover:shadow transition duration-150"
                        >
                            <span>Cerrar sesion</span>
                        </button>
                        <button
                            onClick={DeleteUser}
                            type="button"
                            className="font-bold text-red-600 rounded-2xl px-4 py-2 hover:border-slate-400  hover:bg-red-600 hover:text-white hover:shadow transition duration-150"
                        >
                            <span>Delete user</span>
                        </button>
                    </div>
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
