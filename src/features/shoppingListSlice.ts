import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Item {
  id?: string;
  name: string;
  quantity: number;
  dateCreated: Date;
}

interface shoppingList {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  category: string;
  userId: string;
  items: Item[];
  dateCreated: Date;
}

interface ShoppingLists {
  list: shoppingList[];
}

export const initialState: ShoppingLists = {
  list: [],
};

export const getShoppingLists = createAsyncThunk(
  "lists/getLists",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/lists`);

      if (res.data) {
        const lists = await res.data;
        console.log(
          "filtered lists",
          lists.filter((list: shoppingList) => list.userId === userId)
        );
        return lists.filter((list: shoppingList) => list.userId === userId);
      }
      return rejectWithValue("Lists not found");
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

export const addShoppingList = createAsyncThunk(
  "lists/addList",
  async (list: shoppingList, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:3000/lists`, list);
      return res.data;
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

export const shoppingListSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingLists.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
        }
        state.list = action.payload;
      })
      .addCase(addShoppingList.fulfilled, () => {
        alert("List added successfully");
      });
  },
});

export default shoppingListSlice.reducer;
