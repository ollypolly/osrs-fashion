import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectIsOpen = (state: GlobalState) => state.sidebarReducer.isOpen;

export const { toggleIsOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
