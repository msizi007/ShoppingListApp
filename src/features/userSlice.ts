import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type userState = {
  name: string;
  surname: string;
  cellNumber: string;
  username: string;
  password: string;
  isRegistered?: boolean;
  isLoggedIn?: boolean;
};

export const initialState: userState = {
  name: "",
  surname: "",
  cellNumber: "",
  username: "Msizi",
  password: "123456",
  isLoggedIn: false,
  isRegistered: false,
};

type LoginPayload = {
  username: string;
  password: string;
};

// Thunks
export const register = createAsyncThunk(
  "user/register",
  async (user: userState, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/users", user);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response?.data || "Could not register user"
        );
      }
      return rejectWithValue("An unkown error occurred");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?username=${user.username}&password=${user.password}`
      );
      console.log("response", response, response.data == true);
      if (response.data.length > 0) return response.data;
      else return rejectWithValue("Could not login user");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response?.data || "Could not login user");
      }
      return rejectWithValue("An unkown error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.cellNumber = action.payload.cellNumber;
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.isRegistered = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(state, action);

        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.cellNumber = action.payload.cellNumber;
        state.username = action.payload.username;
        state.password = action.payload.password;
        console.log("payload", action.payload);

        if (action.payload) state.isLoggedIn = true;
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
