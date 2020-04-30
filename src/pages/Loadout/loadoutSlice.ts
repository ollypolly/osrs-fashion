import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalState } from "../..";

export interface LoadoutState {
  allItems?: any;
  itemsLoading?: boolean;
  allItemsLoading: boolean;
  allItemsError?: string;
  openDropdown?: string;
  dropdownSearch?: string;
  loadout?: { [id: string]: string };
  loadoutName?: string;
  openModalContent?: any;
}

export const fetchAllItems = createAsyncThunk("all-items/fetch", async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-complete.json`
  );

  return response.json();
});

const initialState: LoadoutState = {
  allItemsLoading: true,
};

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
      if (!action.payload.id) {
        delete state.loadout[action.payload.name];
      } else {
        state.loadout[action.payload.name] = action.payload.id;
      }
    },
    setLoadout: (state, action) => {
      state.loadout = action.payload;
    },
    setDropdownSearch: (state, action) => {
      state.dropdownSearch = action.payload;
    },
    setLoadoutName: (state, action) => {
      state.loadoutName = action.payload;
    },
    setOpenModalContent: (state, action) => {
      state.openModalContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllItems.pending, (state, action) => {
      state.allItemsLoading = true;
    });
    builder.addCase(fetchAllItems.fulfilled, (state, action) => {
      state.allItems = action.payload;
      state.allItemsLoading = false;
    });
    builder.addCase(fetchAllItems.rejected, (state, action) => {
      state.allItemsLoading = false;
      state.allItemsError = "Could not fetch items";
    });
  },
});

export const selectAllItems = (state: GlobalState) =>
  state.loadoutReducer.allItems;

export const selectAllItemsLoading = (state: GlobalState) =>
  state.loadoutReducer.allItemsLoading;

export const selectAllItemsError = (state: GlobalState) =>
  state.loadoutReducer.allItemsError;

export const selectItemsLoading = (state: GlobalState) =>
  state.loadoutReducer.itemsLoading;

export const selectOpenDropdown = (state: GlobalState) =>
  state.loadoutReducer.openDropdown;

export const selectCurrentLoadout = (state: GlobalState) =>
  state.loadoutReducer.loadout;

export const selectDropdownSearch = (state: GlobalState) =>
  state.loadoutReducer.dropdownSearch;

export const selectLoadoutArray = (state: GlobalState) => {
  const allItems = selectAllItems(state);
  const loadout = selectCurrentLoadout(state);

  if (!loadout) {
    return;
  }

  return Object.values(loadout).map((id) => allItems[id]);
};

export const selectLoadoutValues = (state: GlobalState) => {
  const loadoutArray = selectLoadoutArray(state);

  const values: { [id: string]: number } = {
    attack_crush: 0,
    attack_magic: 0,
    attack_ranged: 0,
    attack_slash: 0,
    attack_stab: 0,
    defence_crush: 0,
    defence_magic: 0,
    defence_ranged: 0,
    defence_slash: 0,
    defence_stab: 0,
    magic_damage: 0,
    melee_strength: 0,
    prayer: 0,
    ranged_strength: 0,
  };

  loadoutArray?.forEach((item) =>
    Object.keys(item.equipment).forEach((key) => {
      const value = item.equipment[key];

      values[key] += value;
    })
  );

  return values;
};

export const selectWeight = (state: GlobalState) => {
  const loadoutArray = selectLoadoutArray(state);

  let weight = 0;

  loadoutArray?.forEach((item) => (weight += item.weight));

  return weight;
};

export const selectLoadoutName = (state: GlobalState) =>
  state.loadoutReducer.loadoutName;

export const selectOpenModalContent = (state: GlobalState) =>
  state.loadoutReducer.openModalContent;

export const {
  setOpenDropdown,
  setLoadoutItem,
  setLoadout,
  setDropdownSearch,
  setLoadoutName,
  setOpenModalContent,
} = loadoutSlice.actions;

export default loadoutSlice.reducer;
