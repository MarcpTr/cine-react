import { initializeApp } from "firebase/app";

import {
    browserLocalPersistence,
    deleteUser,
    getAuth,
    GoogleAuthProvider,
    reauthenticateWithPopup,
    setPersistence,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMdS3MpKCsGvOd7-ejbsTqDJ92OLKM3fA",
    authDomain: "cine-93195.firebaseapp.com",
    projectId: "cine-93195",
    storageBucket: "cine-93195.appspot.com",
    messagingSenderId: "875866599556",
    appId: "1:875866599556:web:1e2061afd4c1b9461912d1",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    await setPersistence(auth, browserLocalPersistence);

    return signInWithPopup(auth, googleProvider);
}

export async function logout() {
    await signOut(auth);
}

export async function removeCurrentUser() {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error("No hay ningún usuario autenticado.");
    }

    await reauthenticateWithPopup(
        currentUser,
        googleProvider
    );

    await deleteUser(currentUser);
}