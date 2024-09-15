import {configureStore } from "@reduxjs/toolkit";
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


const persistConfig = {
  key: "auth",
  storage: storageSession,   
   
};


const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    cart: cartReducer,
    filter: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
