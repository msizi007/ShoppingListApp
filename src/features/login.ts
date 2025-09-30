import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type userState = {
  name: string;
  surname: string;
  cellNumber: string;
  username: string;
  password: string;
  isLoggedIn: boolean;
};

export const initialState: userState = {
  name: "",
  surname: "",
  cellNumber: "",
  username: "Msizi",
  password: "123456",
  isLoggedIn: false,
};

type LoginPayload = {
  username: string;
  password: string;
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      console.log(action.payload.username, action.payload.password);
    },
    register: () => {},
    updateUser: () => {},
  },
});

export const { login, register, updateUser } = userSlice.actions;
export default userSlice.reducer;
