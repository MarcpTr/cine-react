import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
    reauthenticateWithPopup,
    setPersistence,
    deleteUser,
    signInWithPopup, getAdditionalUserInfo,
    GoogleAuthProvider,
    browserLocalPersistence,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

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

export function SignUp() {
    setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((user) => {


            if (getAdditionalUserInfo(user).isNewUser) {
                setDoc(doc(db, "Users", user.user.uid), { liked: [], watched: [], watchlist: [] });
            }
        });
    });
}
export function DeleteUser() {
    let bol = confirm("Seguro que quieres eliminar la cuenta?");
    if (bol) {
        reauthenticateWithPopup(
            getAuth().currentUser,
            new GoogleAuthProvider()
        ).then((credential) => {
            deleteUser(getAuth().currentUser).then(() => console.log("user deleted"));
        });
    }
}
export function SignOut() {
    signOut(auth).then(() => {  });
}

function GetRef() {
    let docRef = doc(db, "Users", getAuth().currentUser.uid);
    return docRef;
}
export function liked(id, posterPath, title, release_date) {
    updateDoc(
        GetRef(),
        {
            liked: arrayUnion({
                id,
                posterPath,
                title,
                release_date
            }),
        },
        { merge: true }
    );
}
export function watched(id, posterPath, title, release_date) {
    updateDoc(
        GetRef(),
        {
            watched: arrayUnion({
                id,
                posterPath,
                title,
                release_date
            }),
        },
        { merge: true }
    );
}
export function watchlist(id, posterPath, title, release_date) {
    updateDoc(
        GetRef(),
        {
            watchlist: arrayUnion({
                id,
                posterPath,
                title,
                release_date
            }),
        },
        { merge: true }
    );
}
