import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IState {
  projectModalOpen: boolean;
}

const initialState: IState = {
  projectModalOpen: false,
};

// Slice
export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true; // redux toolkit uses immer.js under the hood
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

// Selectors
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
