import React, { useContext, useEffect, useState, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  getAuth,
} from 'firebase/auth';
import { auth, provider } from './firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 👉 Define login, signup, and GitHub login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGithub = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    login,
    signup,
    loginWithGithub,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

