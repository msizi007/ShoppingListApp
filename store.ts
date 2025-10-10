import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./src/features/registerSlice";
import loginReducer from "./src/features/loginSlice";
import profileReducer from "./src/features/profileSlice";
import shoppingListsReducer from "./src/features/shoppingListSlice";
import itemsReducer from "./src/features/itemSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    shoppingLists: shoppingListsReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
