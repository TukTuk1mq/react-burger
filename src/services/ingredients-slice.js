import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";

export const FETCHING_INGREDIENTS_START = "FETCHING_INGREDIENTS_START";
export const FETCHING_INGREDIENTS_SUCCESS = "FETCHING_INGREDIENTS_SUCCESS";
export const FETCHING_INGREDIENTS_ERROR = "FETCHING_INGREDIENTS_ERROR";

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredients();
    return data.data; 
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
