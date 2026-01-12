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
  filterdList: Item[];
}

const BASE_URL = "https://shopping-json-server.onrender.com/items";

export const initialState: Items = {
  list: [],
  filterdList: [],
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async (listId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`${BASE_URL}?listId=${listId}`);

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
      const res = await axios.post(BASE_URL, item);
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
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue("Item not deleted");
    }
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (item: Item, { rejectWithValue }) => {
    if (isNaN(Number(item.quantity)))
      return rejectWithValue("Invalid quantity");
    try {
      const res = await axios.put(`${BASE_URL}/${item.id}`, item);
      return res.data;
    } catch (error) {
      return rejectWithValue("Item not updated");
    }
  }
);

// SEARCH
async function findKeyword(data: Item[], keyword: string) {
  return data.filter((item: Item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  });
}

export const searchItems = createAsyncThunk(
  "items/searchItem",
  async (name: string, { rejectWithValue }) => {
    try {
      const res = await axios(BASE_URL);
      console.log(res.data);

      if (res.data) {
        const items = await findKeyword(res.data, name);
        return items;
      }
      return rejectWithValue("Items not found");
    } catch (error) {
      return rejectWithValue("Items not found");
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
        window.location.reload();
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.list = state.list.map((item: Item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
        alert("Item updated successfully");
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.filterdList = action.payload;
      });
  },
});

// This is a reducer.... maybe...
export const getItemCount = (listId: string) => (state: any) => {
  return state.items.list.filter((item: Item) => item.listId === listId).length;
};

export default itemSlice.reducer;
