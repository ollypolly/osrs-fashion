import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface LoadoutState {
  helmetItems?: any[];
}

const initialState: LoadoutState = {};

export const loadoutSlice = createSlice({
  name: "loadout",
  initialState,
  reducers: {},
});

export const selectHelmetItems = (state: GlobalState) =>
  state.loadoutReducer.helmetItems;

export const {} = loadoutSlice.actions;

export default loadoutSlice.reducer;
