import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const LIST_NAMES = ["liked", "watched", "watchlist"];

function validateListName(listName) {
    if (!LIST_NAMES.includes(listName)) {
        throw new Error(`Lista no válida: ${listName}`);
    }
}

function validateUid(uid) {
    if (!uid) {
        throw new Error("Se necesita un UID.");
    }
}

function validateMovie(movie) {
    if (!movie?.id) {
        throw new Error("La película debe tener un ID.");
    }
}

function getListReference(uid, listName) {
    validateUid(uid);
    validateListName(listName);

    return collection(db, "Users", uid, listName);
}

export async function getUserMovies(uid) {
    validateUid(uid);

    const result = {
        liked: [],
        watched: [],
        watchlist: [],
    };

    for (const listName of LIST_NAMES) {
        const listReference = getListReference(uid, listName);
        const snapshot = await getDocs(listReference);

        result[listName] = snapshot.docs.map((document) => ({
            ...document.data(),
            id: Number(document.id),
        }));
    }

    return result;
}

export async function addMovieToList(uid, listName, movie) {
    validateUid(uid);
    validateListName(listName);
    validateMovie(movie);

    const movieReference = doc(
        db,
        "Users",
        uid,
        listName,
        String(movie.id)
    );

    await setDoc(movieReference, {
        id: movie.id,
        posterPath: movie.posterPath || movie.poster_path || null,
        title: movie.title || "",
        release_date: movie.release_date || "",
        addedAt: serverTimestamp(),
    });
}

export async function removeMovieFromList(uid, listName, movieId) {
    validateUid(uid);
    validateListName(listName);

    if (!movieId) {
        throw new Error("Se necesita un ID de película.");
    }

    const movieReference = doc(
        db,
        "Users",
        uid,
        listName,
        String(movieId)
    );

    await deleteDoc(movieReference);
}

export async function isMovieInList(uid, listName, movieId) {
    validateUid(uid);
    validateListName(listName);

    if (!movieId) {
        return false;
    }

    const movieReference = doc(
        db,
        "Users",
        uid,
        listName,
        String(movieId)
    );

    const snapshot = await getDoc(movieReference);

    return snapshot.exists();
}