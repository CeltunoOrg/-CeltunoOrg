import {config} from "./config-fb";

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

// import app from 'firebase/app'
// import firestore from 'firebase/firestore'
// import auth from 'firebase/auth'
// import storage from 'firebase/storage'
// import db from 'firebase/database'

// import firebaseConfig from './config'

// export class Firebase {
//   // app: app.FirebaseApp
//   // auth: auth.Auth
//   // db: db.Database//.firestore.Firestore
//   // firestore: (firestore.Firestore)// => app.firestore.Firestore
//   // files: 

//   constructor() {
//     const App = app.initializeApp(firebaseConfig)
    
//     this.auth = auth.aut
//     this.db = app.database()
//     this.firestore = app.firestore
//     this.files = app.storage()
//   }
// }

// const firebase = new Firebase()
// export default firebase

// // Import the functions you need from the SDKs you need
// // import firebase, { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase/app";
// // import 'firebase/compat/firestore';
// import { getDatabase } from "firebase/database";
// // import 'firebase/compat/database';
// import { getAuth } from "firebase/auth";
// // import 'firebase/compat/auth';
// // import { getAnalytics } from "firebase/analytics";
// // import database from "firebase/database"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB8ncDhcJTl8BTau0QmRwwLYxw2n4PqlrE",
//   authDomain: "myday-29fb6.firebaseapp.com",
//   projectId: "myday-29fb6",
//   databaseURL: "https://myday-29fb6-default-rtdb.europe-west1.firebasedatabase.app",
//   storageBucket: "myday-29fb6.appspot.com",
//   messagingSenderId: "280242527261",
//   appId: "1:280242527261:web:ea5670e995ddcb26d1baf4",
//   measurementId: "G-GQVTKD11VK"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(fbapp);
// // let firebaseHandlers = {firebase,firebaseConfig, database}
//  const fdb = getDatabase(firebaseApp);

//  const fauth = getAuth(firebaseApp);
// const fbexport  = {fdb, fauth};
// export default fbexport;

