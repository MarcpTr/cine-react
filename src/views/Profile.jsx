import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";
import ProfileElement from "../components/ProfileElement";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Gallery from "../components/Gallery";

function Profile({ title }) {
    const user = useContext(userContext);
    const [userData, setUserData] = useState(null);
    const [movies, setMovies] = useState(null);
    const [activeTab, setActiveTab] = useState("liked");

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
        if (user != null) {
            setUserData({
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
            });
            const docRef = doc(db, "Users", user.uid);
            getDoc(docRef).then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setMovies(documentSnapshot.data());
                } else {
                }
            });
        } else {
            setUserData(null);
        }
    }, [user]);
    document.title = title;

    return (
        <>
            <ProfileElement user={userData}></ProfileElement>
            {user && movies ? (
                <>
                    <section className="profile-tabs" role="tablist">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                className={`profile-tab ${activeTab === tab.id ? "active" : ""
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
                                <p>No tienes películas en esta lista.</p>
                            </div>
                        )}
                    </section>
                </>
            ) : (
                ""
            )}
        </>
    );
}
export default Profile;
