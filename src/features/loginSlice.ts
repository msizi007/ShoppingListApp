import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isValidEmail } from "../utils/emailValidator";

export type loginState = {
  email: string;
  password: string;
  isLoggedIn?: boolean;
  errorMessage?: string;
};

export const initialState: loginState = {
  email: "",
  password: "",
  isLoggedIn: false,
  errorMessage: "",
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user: loginState, { rejectWithValue }) => {
    // if not all input fields are filled... Reject
    if (!(user.email && user.password))
      return rejectWithValue("All input fields are required.");
    // If email provided is not valid.. reject
    if (!isValidEmail(user.email))
      return rejectWithValue("Invalid email address");
    // if password is less than 6 characters... reject
    if (user.password.length < 6)
      return rejectWithValue("Password must be at least 6 characters");

    try {
      const response = await axios.get(`http://localhost:3000/users`);
      console.log({ response });
      // if response is not empty accept else ... reject
      if (response.data.length > 0) {
        console.log(".... data > 0");
        console.log(
          response.data.filter(
            (u: loginState) =>
              u.email == user.email && u.password == user.password
          )
        );

        const foundUser = response.data.filter(
          (u: loginState) =>
            u.email == user.email && u.password == user.password
        );
        console.log({ foundUser });
        if (foundUser.length > 0) return foundUser;
        else return rejectWithValue("Invalid username or password");
      } else {
        return rejectWithValue("User not found!");
      }
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

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.errorMessage =
          (action.payload as string) || "User Registration Failed";
      });
  },
});

export default loginSlice.reducer;
