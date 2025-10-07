import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userState {
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

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`);
      if (res.ok) {
        const user = await res.json();
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.surname = action.payload.surname;
        state.cellNumber = action.payload.cellNumber;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default profileSlice.reducer;
