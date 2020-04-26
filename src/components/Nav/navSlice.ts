import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface NavState {
  darkMode: boolean;
}

const initialState: NavState = {
  darkMode: true,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const selectDarkMode = (state: GlobalState) => state.navReducer.darkMode;

export const { toggleDarkMode } = navSlice.actions;

export default navSlice.reducer;
