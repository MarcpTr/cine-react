import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";
import ProfileElement from "../components/ProfileElement";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Gallery from "../components/Gallery";
import Spinner from "../components/Spinner";

function Profile({ title }) {
    const user = useContext(userContext);

    const [userData, setUserData] = useState(null);
    const [movies, setMovies] = useState(null);
    const [activeTab, setActiveTab] = useState("liked");
    const [isLoading, setIsLoading] = useState(true);

    const tabs = [
        {
            id: "liked",
            label: "Me gusta",
            movies: movies?.liked || [],
        },
        {
            id: "watched",
            label: "Vistas",
            movies: movies?.watched || [],
        },
        {
            id: "watchlist",
            label: "Mi lista",
            movies: movies?.watchlist || [],
        },
    ];

    const activeMovies =
        tabs.find((tab) => tab.id === activeTab)?.movies || [];

    useEffect(() => {
        document.title = title;

        const loadProfile = async () => {
            if (!user) {
                setUserData(null);
                setMovies(null);
                setIsLoading(false);
                return;
            }

            setUserData({
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
            });

            setIsLoading(true);

            try {
                const docRef = doc(db, "Users", user.uid);
                const documentSnapshot = await getDoc(docRef);

                if (documentSnapshot.exists()) {
                    setMovies(documentSnapshot.data());
                } else {
                    setMovies(null);
                }
            } catch (error) {
                console.error("Error cargando el perfil:", error);
                setMovies(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [user, title]);

    return (
        <>
            <ProfileElement user={userData} />

            {isLoading ? (
                <Spinner />
            ) : user && movies ? (
                <>
                    <section className="profile-tabs" role="tablist">
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