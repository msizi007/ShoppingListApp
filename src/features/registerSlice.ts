import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isValidEmail } from "../utils/emailValidator";

export type registerState = {
  name: string;
  surname: string;
  cellNumber: string;
  email: string;
  password: string;
  isRegistered?: boolean;
  errorMessage?: string;
};

export const initialState: registerState = {
  name: "",
  surname: "",
  cellNumber: "",
  email: "",
  password: "",
  isRegistered: false,
  errorMessage: "",
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user: registerState, { rejectWithValue }) => {
    // if not all input fields are filled... Reject
    if (
      !(
        user.name &&
        user.surname &&
        user.cellNumber &&
        user.email &&
        user.password
      )
    )
      return rejectWithValue("All input fields are required.");
    // If email provided is not valid.. reject
    if (!isValidEmail(user.email))
      return rejectWithValue("Invalid email address");
    // if password is less than 6 characters... reject
    if (user.password.length < 6)
      return rejectWithValue("Password must be at least 6 characters");
    // if email already exists ... reject
    const res = await axios.get(
      `http://localhost:3000/users?email=${user.email}`
    );
    if (res.data.length > 0) {
      return rejectWithValue("Email already exists");
    }

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

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistered = false;
        state.errorMessage =
          (action.payload as string) || "User Registration Failed";
      });
  },
});

export default registerSlice.reducer;
