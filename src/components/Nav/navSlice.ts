import { createSlice } from "@reduxjs/toolkit";

export interface NavState {
  darkMode: boolean;
}

const initialState: NavState = {
  darkMode: false,
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

export const { toggleDarkMode } = navSlice.actions;

export default navSlice.reducer;
