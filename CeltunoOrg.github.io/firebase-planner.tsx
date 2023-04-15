import {config} from "./config-fb_planner";

import firebase, { initializeApp } from "firebase/app";
import {getDatabase, onValue, ref} from "firebase/database";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const app = initializeApp(config);
export const auth = getAuth(app);
export const db  = getDatabase(app);
export const firestore = getFirestore(app);
export const useTheOnValue = onValue;
export const useTheRef = ref;
export default app;

