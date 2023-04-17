
// import * as React from "react";
// import firebase, { FirebaseApp } from "firebase/app";
// import firebaseapp2 from "./firebase";
// type User = firebaseApp2.User | null;
// type ContextState = { user: User };
// type Props = {
//     children?: React.ReactNode
//   };
// const FirebaseAuthContext =
//   React.createContext<ContextState | undefined>(undefined);

// const FirebaseAuthProvider: React.FC<Props> = ({ children }) => {
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