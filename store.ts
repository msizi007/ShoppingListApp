import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./src/features/registerSlice";
import loginReducer from "./src/features/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
