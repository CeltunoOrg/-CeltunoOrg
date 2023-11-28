import { config } from "./config-fb_planner";

import firebase, { initializeApp, setLogLevel, } from "firebase/app";
import { connectDatabaseEmulator, getDatabase, onValue, ref } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInAnonymously, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, where, query } from "firebase/firestore"

// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "planner-65610.firebaseapp.com",
//     databaseURL: "https://planner-65610-default-rtdb.europe-west1.firebasedatabase.app/",
//     projectId: "planner-65610",
//     storageBucket: "planner-65610.appspot.com",
//     messagingSenderId: "572370352440",
//     appId: "1:572370352440:web:c316dd8592973a6d7da9cd"
// };

const app = () => {
    const apiKey = process.env.REACT_APP_APIKey ?? ""
    config.apiKey = apiKey;
    if (process.env.NODE_ENV === 'development')
        setLogLevel('debug')
    const tmpApp = initializeApp(config);
    return tmpApp;
}
export const auth = getAuth(app());
const getDb = () => {
    const tmpDb = getDatabase(app());
    if (location.hostname === "localhost" && process.env.NODE_ENV === 'development') {
        // Point to the RTDB emulator running on localhost.
        connectDatabaseEmulator(tmpDb, "127.0.0.1", 9000);
    }

    return tmpDb
}
export const db = getDb()

export const firestore = getFirestore(app());
export const useTheOnValue = onValue;
export const useTheRef = ref
export const SignOut = async () => {
    signOut(auth).then(() => {
        console.log("Signed out of fb-Google");
        // Sign-out successful.
    }).catch((error) => {
        console.log("Error signing out: " + error);
        // An error happened.
    });
}

export const googleProvider = new GoogleAuthProvider();
export const SignInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(firestore, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
        let result = -1;
        if (user)
            result = 1;
        return result
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};
export const SignInAnonymously = async () => {
    signInAnonymously(auth)
        .then(() => {
            // Signed in..
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.error(error);
            alert(error.message);
            // ...
        });
}

export default app;

