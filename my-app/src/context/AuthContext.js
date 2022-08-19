import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "C:/Users/alexi/Downloads/VsCode Projects/Wubo (Health Website)/Health-Website/my-app/src/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import {getAuth} from "firebase/auth";


const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const auths = getAuth();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auths, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auths, email, password);
  }

  function logout() {
    return signOut(auths);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auths, email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (<AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>);
}
