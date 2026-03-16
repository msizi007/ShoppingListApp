import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import shoppingListsReducer from "./src/features/shoppingListSlice";
import itemsReducer from "./src/features/itemSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingLists: shoppingListsReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
