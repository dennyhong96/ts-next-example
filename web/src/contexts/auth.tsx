import React, { createContext, useContext, FC } from "react";
import { useState } from "react";
import { auth } from "@lib/firebase";
import { IUser } from "@components/screens/projects";
import { useEffect } from "react";
import { UserCredential } from "@firebase/auth-types";

interface IAuthForm {
  email: string;
  password: string;
}

export const AuthContext = createContext<
  | {
      user: IUser | null;
      login: (form: IAuthForm) => Promise<UserCredential>;
      signup: (form: IAuthForm) => Promise<UserCredential>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  console.log({ user });

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
        });
      } else {
        // User is signed out
        setUser(null);
      }
    });
  }, []);

  const login = (form: IAuthForm) => auth.signInWithEmailAndPassword(form.email, form.password);

  const signup = (form: IAuthForm) =>
    auth.createUserWithEmailAndPassword(form.email, form.password);

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
