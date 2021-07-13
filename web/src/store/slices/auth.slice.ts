import { createSlice } from "@reduxjs/toolkit";

import { bootstrapUser, IAuthForm } from "@contexts/auth";
import { auth } from "@lib/firebase";
import { IUser } from "@components/screens/projects";
import { AppDispatch, RootState } from "..";

interface IState {
  user: IUser | null;
}

const initialState: IState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;

// Thunks
export const login = (form: IAuthForm) => (dispatch: AppDispatch) => {
  return auth.signInWithEmailAndPassword(form.email, form.password).then((res) =>
    dispatch(
      setUser({
        id: res.user?.uid,
        name: res.user?.displayName ?? "",
        email: res.user?.email,
      }),
    ),
  );
};

export const signup = (form: IAuthForm) => (dispatch: AppDispatch) => {
  return auth.createUserWithEmailAndPassword(form.email, form.password).then((res) =>
    dispatch(
      setUser({
        id: res.user?.uid,
        name: res.user?.displayName ?? "",
        email: res.user?.email,
      }),
    ),
  );
};

export const logout = () => (dispatch: AppDispatch) => {
  return auth.signOut().then(() => dispatch(setUser(null)));
};

export const bootStrap = () => (dispatch: AppDispatch) => {
  return bootstrapUser().then((user) => dispatch(setUser(user)));
};
