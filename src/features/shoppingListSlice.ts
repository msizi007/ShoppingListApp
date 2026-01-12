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

const BASE_URL = "https://shopping-json-server.onrender.com/lists";

export const getShoppingLists = createAsyncThunk(
  "lists/getLists",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios(BASE_URL);

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
      const res = await axios(`${BASE_URL}/${listId}`);

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
      const res = await axios.post(BASE_URL, list);
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
      const res = await axios.delete(`${BASE_URL}/${id}`);
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
      const res = await axios.put(`${BASE_URL}/${list.id}`, list);
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
      const res = await axios(BASE_URL);

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
    sortByCategory: (state) => {
      state.list = [...state.list].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    },
    sortByDate: (state) => {
      state.list = [...state.list].sort((a, b) =>
        a.dateCreated.localeCompare(b.dateCreated)
      );
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
        state.errorMessage = (action.payload as string) || "Lists not found";
        alert(action.payload as string);
      })
      .addCase(deleteShoppingList.fulfilled, (state, action) => {
        alert("List deleted successfully");
        state.list = action.payload;
        window.location.reload();
      })
      .addCase(deleteShoppingList.rejected, () => {
        alert("List delete failed");
      })
      .addCase(getSingleShoppingList.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(searchShoppingList.fulfilled, (state, action) => {
        state.filteredList = action.payload;
      })
      .addCase(updateShoppingList.rejected, (state, action) => {
        state.errorMessage = (action.payload as string) || "Lists not found";
      })
      .addCase(updateShoppingList.fulfilled, (state, action) => {
        state.list = state.list.map((list: shoppingList) => {
          if (list.id === action.payload.id) {
            return action.payload;
          }
          return list;
        });
        alert("List updated successfully");
        window.location.reload();
      });
  },
});

export default shoppingListSlice.reducer;

export const { sortByName, sortByCategory, sortByDate } =
  shoppingListSlice.actions;
