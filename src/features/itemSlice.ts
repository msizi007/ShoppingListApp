import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Item {
  id?: string;
  name: string;
  quantity: string;
  dateCreated: string;
  listId: string;
}

export interface Items {
  list: Item[];
  errorMessage?: string;
}

export const initialState: Items = {
  list: [],
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async (listId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/items?listId=${listId}`);

      if (res.data) {
        const items = await res.data;
        return items;
      }
      return rejectWithValue("Items not found");
    } catch (error) {
      return rejectWithValue("Items not found");
    }
  }
);

export const addItem = createAsyncThunk(
  "items/addItem",
  async (item: Item, { rejectWithValue }) => {
    if (isNaN(Number(item.quantity)))
      return rejectWithValue("Invalid quantity");
    try {
      const res = await axios.post(`http://localhost:3000/items`, item);
      return res.data;
    } catch (error) {
      return rejectWithValue("Item not added");
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:3000/items/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue("Item not deleted");
    }
  }
);

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.fulfilled, (state, action) => {
        const newItems = action.payload;
        const listId = newItems[0]?.listId;
        if (listId) {
          state.list = state.list.filter(
            (item: Item) => item.listId !== listId
          );
        }
        state.list = [...state.list, ...newItems];
      })
      .addCase(getItems.rejected, (state, action) => {
        state.errorMessage = (action.payload as string) || "Items not found";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
        alert("Item added successfully");
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item: Item) => item.id !== action.payload.id
        );
        alert("Item deleted successfully");
      });
  },
});

// This is a reducer.... maybe...
export const getItemCount = (listId: string) => (state: any) => {
  console.log("items list...", state);

  return state.items.list.filter((item: Item) => item.listId === listId).length;
};

export default itemSlice.reducer;
