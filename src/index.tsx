import React from "react";
//@ts-ignore
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navReducer, { NavState } from "./components/Nav/navSlice";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import sidebarReducer, {
  SidebarState,
} from "./components/Sidebar/sidebarSlice";
import loadoutReducer, { LoadoutState } from "./pages/Loadout/loadoutSlice";
import thunk from "redux-thunk";

export interface GlobalState {
  navReducer: NavState;
  sidebarReducer: SidebarState;
  loadoutReducer: LoadoutState;
}

const persistConfig = {
  key: "root",
  whitelist: ["navReducer", "sidebarReducer"],
  storage,
};

const rootReducer = combineReducers({
  navReducer,
  sidebarReducer,
  loadoutReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
