import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

// type LoginPayload = {
//   username: string;
//   password: string;
// };

// Thunk
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: () => {},
  },
  extraReducers: () => {},
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
