import React, { createContext, FC, useEffect, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { UserCredential } from "@firebase/auth-types";

import * as authStore from "@store/slices/auth.slice";
import useAsync from "@hooks/useAsync";
import { auth, db } from "@lib/firebase";
import { IUser } from "@components/screens/projects";
import FullPageLoading from "@components/fullPageLoading";
import FullPageErrorFallback from "@components/fullPageErrorFallback";

export interface IAuthForm {
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

export const bootstrapUser = async () => {
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

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(authStore.selectUser);

  console.log({ user });

  const login = useCallback((form: IAuthForm) => dispatch(authStore.login(form)), [dispatch]);

  const signup = useCallback((form: IAuthForm) => dispatch(authStore.signup(form)), [dispatch]);

  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    signup,
    logout,
  };
};

// Handles firstload and subscription
export const AuthProvider: FC = ({ children }) => {
  const { run, isLoading, isIdle, isError, error } = useAsync<IUser | null>();

  const dispatch: (...args: unknown[]) => Promise<IUser> = useDispatch();
  const { user } = useAuth();

  const { replace } = useRouter();

  useEffect(() => {
    run(dispatch(authStore.bootStrap()));

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userToStore = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
        };

        dispatch(authStore.setUser(userToStore));
        localStorage.setItem("usr", JSON.stringify(userToStore));

        db.collection("users")
          .doc(userToStore.id)
          .set({
            email: userToStore.email,
            name: firebaseUser.displayName ?? userToStore.email.split("@").filter(Boolean)[0],
          });
      } else {
        // User is signed out
        dispatch(authStore.setUser(null));
        localStorage.removeItem("usr");
      }
    });

    return unsubscribe;
  }, [dispatch, run]);

  console.log({ isIdle, isLoading, user });

  useEffect(() => {
    if (!isIdle && !isLoading && !user) replace("/auth/login");
    // eslint-disable-next-line
  }, [isIdle, isLoading, user]);

  if (isIdle || isLoading) return <FullPageLoading />;

  if (isError) return <FullPageErrorFallback error={error} />;

  return <Fragment>{children}</Fragment>;
};
