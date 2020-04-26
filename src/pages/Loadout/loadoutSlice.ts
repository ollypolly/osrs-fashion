import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface LoadoutState {
  items?: any;
  itemsLoading?: boolean;
  openDropdown?: string;
  loadout?: any;
}

export const fetchItems = createAsyncThunk(
  "items/fetch",
  async (type: string) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-json-slot/items-${type}.json`
    );

    return response.json().then((data) => ({
      name: type,
      items: data,
    }));
  }
);

const initialState: LoadoutState = {};

export const loadoutSlice = createSlice({
  name: "loadout",
  initialState,
  reducers: {
    setOpenDropdown: (state, action) => {
      state.openDropdown = action.payload;
    },
    setLoadoutItem: (state, action) => {
      if (!state.loadout) {
        state.loadout = {};
      }
      state.loadout[action.payload.name] = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.itemsLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      if (!state.items) {
        state.items = {};
      }
      state.items[action.payload.name] = action.payload.items;
      state.itemsLoading = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.itemsLoading = false;
    });
  },
});

export const selectItems = (state: GlobalState) => state.loadoutReducer.items;

export const selectItemsLoading = (state: GlobalState) =>
  state.loadoutReducer.itemsLoading;

export const selectOpenDropdown = (state: GlobalState) =>
  state.loadoutReducer.openDropdown;

export const selectCurrentLoadout = (state: GlobalState) =>
  state.loadoutReducer.loadout;

export const { setOpenDropdown, setLoadoutItem } = loadoutSlice.actions;

export default loadoutSlice.reducer;
