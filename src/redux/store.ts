import {combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import {
  FLUSH,
  persistReducer,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  REHYDRATE,
} from "redux-persist";
import { baseApi } from "./api/baseApi";

import authReducer from "./features/authSlice";
import filterReducer from "./features/filterSlice";
import cartReducer from "./features/cartSlice";
import themeReducer from "./features/themeSlice";


const persistConfig = {
  key: "root",
  storage: storageSession,   
  whitelist: ["auth", "cart"], 
   
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  filter: filterReducer,
  theme: themeReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
