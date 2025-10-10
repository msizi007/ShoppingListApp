import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Category =
  | "Groceries"
  | "Clothing"
  | "Electronics"
  | "Party"
  | "Personal Care"
  | "Stationery";

export interface shoppingList {
  id?: string;
  name: string;
  description: string;
  category: Category;
  userId: string;
  dateCreated: string;
}

interface ShoppingLists {
  current: shoppingList;
  list: shoppingList[];
  filteredList: shoppingList[];
  errorMessage?: string;
  isLoading: boolean;
}

export const initialState: ShoppingLists = {
  list: [],
  filteredList: [],
  current: {} as shoppingList,
  isLoading: true,
};

export const getShoppingLists = createAsyncThunk(
  "lists/getLists",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/lists`);

      if (res.data) {
        const lists = await res.data;

        return lists.filter((list: shoppingList) => list.userId === userId);
      }
      return rejectWithValue("Lists not found");
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

export const getSingleShoppingList = createAsyncThunk(
  "lists/getSingleList",
  async (listId: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/lists/${listId}`);

      if (res.data) {
        const list = await res.data;
        return list;
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

export const updateShoppingList = createAsyncThunk(
  "lists/updateList",
  async (list: shoppingList, { rejectWithValue }) => {
    console.log(list.id);

    try {
      const res = await axios.put(
        `http://localhost:3000/lists/${list.id}`,
        list
      );
      console.log(res.data, list.id);

      return res.data;
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

// SEARCH
async function findKeyword(data: shoppingList[], keyword: string) {
  return data.filter((list: shoppingList) => {
    return list.name.toLowerCase().includes(keyword.toLowerCase());
  });
}

export const searchShoppingList = createAsyncThunk(
  "lists/searchList",
  async (name: string, { rejectWithValue }) => {
    try {
      const res = await axios(`http://localhost:3000/lists`);

      if (res.data) {
        const lists = await findKeyword(res.data, name);
        console.log(lists);

        return lists;
      }
      return rejectWithValue("Lists not found");
    } catch (error) {
      return rejectWithValue("Lists not found");
    }
  }
);

export const shoppingListSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    sortByName: (state) => {
      state.list = [...state.list].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingLists.fulfilled, (state, action) => {
        if (action.payload.length > 0) state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(getShoppingLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShoppingLists.rejected, (state, action) => {
        state.errorMessage = (action.payload as string) || "Lists not found";
        state.isLoading = false;
      })
      .addCase(addShoppingList.fulfilled, (state, action) => {
        state.list.push(action.payload);
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
      })
      .addCase(getSingleShoppingList.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(searchShoppingList.fulfilled, (state, action) => {
        state.filteredList = action.payload;
      });
  },
});

export default shoppingListSlice.reducer;

export const { sortByName } = shoppingListSlice.actions;
