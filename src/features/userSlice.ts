import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isValidEmail } from "../utils/emailValidator";
import { comparePassword, hashPassword } from "../utils/encypt";
import type { LoginPayload, User } from "../types/User";

export type userState = {
  user: User | null;
  error: string;
  loading: boolean;
};

export const initialState: userState = {
  user: null,
  error: "",
  loading: false,
};

const BASE_URL = "https://shopping-json-server.onrender.com/users";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: User, { rejectWithValue }) => {
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
    const res = await axios.get(`${BASE_URL}/?email=${user.email}`);
    if (res.data.length > 0) {
      return rejectWithValue("Email already exists");
    }

    try {
      const securePassword = await hashPassword(user.password);
      const newUser = { ...user, password: securePassword };
      const response = await axios.post(BASE_URL, newUser);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response?.data || "Could not register user",
        );
      }
      return rejectWithValue("An unkown error occurred");
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: LoginPayload, { rejectWithValue }) => {
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
      const response = await axios.get(BASE_URL);

      // if response is not empty accept else ... reject

      if (response.data.length > 0) {
        let foundUser = null;
        for (const u of response.data) {
          if (
            u.email === user.email &&
            (await comparePassword(user.password, u.password))
          ) {
            foundUser = u;
            break;
          }
        }

        if (foundUser) return foundUser;
        else return rejectWithValue("Invalid username or password");
      } else {
        return rejectWithValue("Invalid username or password!");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response?.data || "Could not register user",
        );
      }
      return rejectWithValue("An unkown error occurred");
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "profile/getUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`${BASE_URL}/${userId}`);
      if (res.data) {
        const user = await res.data;
        return user;
      }
      return rejectWithValue("User not found");
    } catch (error) {
      return rejectWithValue("User not found");
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUser",
  async (user: Omit<User, "password">, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/${user.id}`, {
        name: user.name,
        surname: user.surname,
        cellNumber: user.cellNumber,
        email: user.email,
      });

      if (res.data) {
        const updatedUser = await res.data;
        return updatedUser;
      }
      return rejectWithValue("User not found");
    } catch (error) {
      return rejectWithValue("User not found");
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
