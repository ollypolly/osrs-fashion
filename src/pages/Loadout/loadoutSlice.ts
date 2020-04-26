import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface LoadoutState {
  helmetItems?: any;
  helmetLoading: boolean;
  openDropdown?: string;
}

const initialState: LoadoutState = {
  helmetLoading: true,
};

export const fetchHelmetItems = createAsyncThunk(
  "helmet-items/fetch",
  async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-json-slot/items-head.json"
    );

    return response.json();
  }
);

export const loadoutSlice = createSlice({
  name: "loadout",
  initialState,
  reducers: {
    setOpenDropdown: (state, action) => {
      state.openDropdown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHelmetItems.pending, (state, action) => {
      state.helmetLoading = true;
    });
    builder.addCase(fetchHelmetItems.fulfilled, (state, action) => {
      state.helmetItems = action.payload;
      state.helmetLoading = false;
    });
    builder.addCase(fetchHelmetItems.rejected, (state, action) => {
      state.helmetLoading = false;
    });
  },
});

export const selectHelmetItems = (state: GlobalState) =>
  state.loadoutReducer.helmetItems;

export const selectHelmetLoading = (state: GlobalState) =>
  state.loadoutReducer.helmetLoading;

export const selectOpenDropdown = (state: GlobalState) =>
  state.loadoutReducer.openDropdown;

export const { setOpenDropdown } = loadoutSlice.actions;

export default loadoutSlice.reducer;
