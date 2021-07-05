import React, { createContext, useContext, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { UserCredential } from "@firebase/auth-types";

import { auth } from "@lib/firebase";
import useAsync from "@hooks/useAsync";
import useMount from "@hooks/useMount";
import { IUser } from "@components/screens/projects";
import FullPageLoading from "@components/fullPageLoading";
import FullPageErrorFallback from "@components/fullPageErrorFallback";

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

const bootstrapUser = async () => {
  if (typeof window === "undefined") return;
  const localUserResult: string | null = localStorage.getItem("usr");
  if (localUserResult && typeof localUserResult === "string") {
    const localUser = JSON.parse(localUserResult as string);
    // TODO: validate user via admin api?
    return localUser;
  } else {
    localStorage.removeItem("usr");
    return null;
  }
};

export const AuthProvider: FC = ({ children }) => {
  const {
    data: user,
    setData: setUser,
    run,
    isLoading,
    isIdle,
    isError,
    error,
  } = useAsync<IUser | null>();

  // const { replace } = useRouter();

  useMount(() => {
    run(bootstrapUser());

    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userToStore = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
        };

        setUser(userToStore);
        localStorage.setItem("usr", JSON.stringify(userToStore));
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem("usr");
      }
    });
  });

  const login = (form: IAuthForm) => auth.signInWithEmailAndPassword(form.email, form.password);

  const signup = (form: IAuthForm) =>
    auth.createUserWithEmailAndPassword(form.email, form.password);

  const logout = () => auth.signOut();

  // useEffect(() => {
  //   if (!isIdle && !isLoading && !user) replace("/auth/login");
  //   // eslint-disable-next-line
  // }, [isIdle, isLoading, user]);

  if (isIdle || isLoading) return <FullPageLoading />;

  if (isError) return <FullPageErrorFallback error={error} />;

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
