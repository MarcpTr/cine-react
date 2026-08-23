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

const VALID_LISTS = [
    "liked",
    "watched",
    "watchlist",
];

function validateList(list) {
    if (!VALID_LISTS.includes(list)) {
        throw new Error(`Lista inválida: ${list}`);
    }
}

function getMovieCollection(uid, list) {
    validateList(list);

    return collection(
        db,
        "Users",
        uid,
        list
    );
}

export async function getMoviesFromList(uid, list) {
    if (!uid) {
        return [];
    }

    const snapshot = await getDocs(
        getMovieCollection(uid, list)
    );

    return snapshot.docs.map((movie) => ({
        ...movie.data(),
        id: Number(movie.id),
    }));
}

export async function getAllUserLists(uid) {
    if (!uid) {
        return {
            liked: [],
            watched: [],
            watchlist: [],
        };
    }

    const [
        liked,
        watched,
        watchlist,
    ] = await Promise.all([
        getMoviesFromList(uid, "liked"),
        getMoviesFromList(uid, "watched"),
        getMoviesFromList(uid, "watchlist"),
    ]);

    return {
        liked,
        watched,
        watchlist,
    };
}

export async function addMovieToList(
    uid,
    list,
    movie
) {
    if (!uid) {
        throw new Error(
            "No hay usuario autenticado."
        );
    }

    if (!movie?.id) {
        throw new Error(
            "La película no tiene ID."
        );
    }

    validateList(list);

    const movieRef = doc(
        db,
        "Users",
        uid,
        list,
        String(movie.id)
    );

    await setDoc(movieRef, {
        id: movie.id,
        posterPath:
            movie.posterPath ??
            movie.poster_path ??
            null,
        title: movie.title ?? "",
        release_date:
            movie.release_date ?? "",
        addedAt: serverTimestamp(),
    });
}

export async function removeMovieFromList(
    uid,
    list,
    movieId
) {
    if (!uid) {
        throw new Error(
            "No hay usuario autenticado."
        );
    }

    validateList(list);

    const movieRef = doc(
        db,
        "Users",
        uid,
        list,
        String(movieId)
    );

    await deleteDoc(movieRef);
}
export async function isMovieInList(
    uid,
    list,
    movieId
) {
    if (!uid || !movieId) {
        return false;
    }

    const movieRef = doc(
        db,
        "Users",
        uid,
        list,
        String(movieId)
    );

    const snapshot = await getDoc(movieRef);

    return snapshot.exists();
}