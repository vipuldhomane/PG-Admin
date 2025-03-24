import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import merchantReducer from "./slices/merchantDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    merchantData: merchantReducer,
  },
});

export default store;
