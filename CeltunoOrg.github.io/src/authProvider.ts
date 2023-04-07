import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential
} from "firebase/auth";
import { auth } from "../firebase";

// const userAuthContext = createContext(null);

// const [user, setUser] = useState({});
export function UserAuthContextProvider({ children }) {
  return null
}

//   export const someUser : User;
  export function logIn (email, password) {
    signInWithEmailAndPassword(auth, email, password) 
    .then((userCredential) =>{
       
        // setUser(userCredential.user)
        console.log(userCredential.user.email)
        // return auser;
    })  
    .catch((error) => {
        console.log(error)
    });

  } 
  export function anunLogIn(){
    signInAnonymously(auth);
  }
  export  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  export function logOut() {    
      auth.signOut()
      signOut(auth);
      auth.currentUser?.delete
    console.log("Signed out - currentuser: " + auth.currentUser?.email)
  }
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
//       console.log("Auth", currentuser);
//       setUser(currentuser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider
//       value={{ user, logIn, signUp, logOut }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }



// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged }from "firebase/auth"
// import auth from "../firebase"

// export const AuthContext = React.createContext(null);

// export const AuthProvider = ( {children} => {
// const [currentUser, setCurrentUser]  =useState(null);

// })

// import * as React from "react";
// import firebase from "firebase/app";
// import Auth from "@react-firebase/auth"
// Auth.
// type User = firebase.User | null;
// type ContextState = { user: User };
// type Props = {
//     children?: React.ReactNode
//   };
// const FirebaseAuthContext =
//   React.createContext<ContextState | undefined>(undefined);

// const FirebaseAuthProvider: React.FC = ({ children }) => {
//   const [user, setUser] = React.useState<User>(null);
//   const value = { user };

//   React.useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
//     return unsubscribe;
//   }, []);

//   return (
//     <FirebaseAuthContext.Provider value={value}>
//       {children}
//     </FirebaseAuthContext.Provider>
//   );
// };
// function useFirebaseAuth() {
//     const context = React.useContext(FirebaseAuthContext);
//     if (context === undefined) {
//       throw new Error(
//         "useFirebaseAuth must be used within a FirebaseAuthProvider"
//       );
//     }
//     return context.user;
//   }
  
//   export { FirebaseAuthProvider, useFirebaseAuth };