import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useUserMovies } from "../hooks/useUserMovies";

import ProfileElement from "../components/ProfileElement";
import Gallery from "../components/Gallery";
import Spinner from "../components/Spinner";
function Profile({ title }) {
    const { user, loading: authLoading } = useAuth();

    const {
        movies,
        loading: moviesLoading,
        error,
    } = useUserMovies(user);

    const [activeTab, setActiveTab] = useState("liked");

    useEffect(() => {
        document.title = title;
    }, [title]);

    const tabs = [
        {
            id: "liked",
            label: "Me gusta",
            movies: movies.liked,
        },
        {
            id: "watched",
            label: "Vistas",
            movies: movies.watched,
        },
        {
            id: "watchlist",
            label: "Mi lista",
            movies: movies.watchlist,
        },
    ];

    const activeMovies =
        tabs.find((tab) => tab.id === activeTab)?.movies || [];

    if (authLoading) {
        return <Spinner />;
    }

    return (
        <>
            <ProfileElement user={user} />

            {user && moviesLoading ? (
                <Spinner />
            ) : user && error ? (
                <div className="error-message">
                    <p>
                        No se pudieron cargar tus listas.
                    </p>
                </div>
            ) : user ? (
                <>
                    <section
                        className="profile-tabs"
                        role="tablist"
                        aria-label="Listas de películas"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                className={`profile-tab ${
                                    activeTab === tab.id ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span>{tab.label}</span>

                                <span className="tab-count">
                                    {tab.movies.length}
                                </span>
                            </button>
                        ))}
                    </section>

                    <section
                        className="profile-tab-panel"
                        role="tabpanel"
                    >
                        {activeMovies.length > 0 ? (
                            <Gallery movies={activeMovies} />
                        ) : (
                            <div className="empty-list">
                                <p>
                                    No tienes películas en esta lista.
                                </p>
                            </div>
                        )}
                    </section>
                </>
            ) : null}
        </>
    );
}

export default Profile;