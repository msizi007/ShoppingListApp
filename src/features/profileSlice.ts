import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface userState {
  id: string;
  name: string;
  surname: string;
  cellNumber: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

const initialState: userState = {
  id: "",
  name: "",
  surname: "",
  cellNumber: "",
  email: "",
  password: "",
  isLoggedIn: false,
};

export const getUserProfile = createAsyncThunk(
  "profile/getUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/users/${id}`);

      if (res.data) {
        const user = await res.data;
        return user;
      }
      return rejectWithValue("User not found");
    } catch (error) {
      return rejectWithValue("User not found");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.cellNumber = action.payload.cellNumber;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default profileSlice.reducer;
