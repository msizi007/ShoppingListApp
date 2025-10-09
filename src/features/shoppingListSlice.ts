import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Category =
  | "Groceries"
  | "Clothing"
  | "Electronics"
  | "Party"
  | "Personal Care";

export interface shoppingList {
  id?: string;
  name: string;
  description: string;
  category: Category;
  userId: string;
  dateCreated: Date;
}

interface ShoppingLists {
  list: shoppingList[];
  errorMessage?: string;
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

// CREATE LIST
export const addShoppingList = createAsyncThunk(
  "lists/addList",
  async (list: shoppingList, { rejectWithValue }) => {
    if (!list.name || !list.description) {
      return rejectWithValue("All input fields are required.");
    }
    try {
      const res = await axios.post(`http://localhost:3000/lists`, list);
      return res.data;
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

// DELETE LIST
export const deleteShoppingList = createAsyncThunk(
  "lists/deleteList",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:3000/lists/${id}`);
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
      })
      .addCase(addShoppingList.rejected, (state, action) => {
        alert(action.payload as string);
      })
      .addCase(deleteShoppingList.fulfilled, (state, action) => {
        alert("List deleted successfully");
        state.list = action.payload;
      })
      .addCase(deleteShoppingList.rejected, () => {
        alert("List delete failed");
      });
  },
});

export default shoppingListSlice.reducer;
