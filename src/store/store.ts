import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { default as slices } from "./reducers";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";

import { setAutoFreeze } from "immer";

setAutoFreeze(false);

const currencyPersistConfig = {
  key: "aiva",
  storage: localforage,
  safelist: ["interfaceUI", "profile"],
};

const all = combineReducers({
  ...slices,
});

const reducers = persistReducer(currencyPersistConfig, all);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };
