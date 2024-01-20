import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App";
import ProfileElement from "../components/ProfileElement";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import Gallery from "../components/Gallery";

function Profile({title}) {
    const user = useContext(userContext);
    const [userData, setUserData] = useState(null);
    const [movies, setMovies] = useState(null);
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
                    console.log("Document data:", documentSnapshot.data());
                    setMovies(documentSnapshot.data());
                } else {
                    console.log("No such documents");
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
                    <h1>Liked</h1>
                    {movies.liked ? <Gallery movies={movies.liked} /> : ""}
                    <h1>Watched</h1>
                    {movies.watched ? <Gallery movies={movies.watched} /> : ""}
                    <h1>Watchlist</h1>
                    {movies.watchlist ? (
                        <Gallery movies={movies.watchlist} />
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </>
    );
}
export default Profile;
