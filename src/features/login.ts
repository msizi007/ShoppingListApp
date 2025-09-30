import { createSlice } from "@reduxjs/toolkit";

export type LoginState = {
  username: string;
  password: string;
  isLoggedIn: boolean;
};

export const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export default loginSlice.reducer;
