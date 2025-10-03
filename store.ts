import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import registerReducer from "./src/features/registerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
