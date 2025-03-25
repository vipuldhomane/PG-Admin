// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./slices/authSlice";
// import merchantReducer from "./slices/merchantDataSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     merchantData: merchantReducer,
//   },
// });

// export default store;

// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";
import merchantReducer from "./slices/merchantDataSlice";

// Combine your reducers (even if you only have one)
const rootReducer = combineReducers({
  auth: authReducer,
  merchantData: merchantReducer,
});

// Create a persist config - here we persist the entire root, but you can adjust whitelist/blacklist as needed.
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist the auth slice
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid warnings
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Create a persistor linked to your store
export const persistor = persistStore(store);
export default store;
