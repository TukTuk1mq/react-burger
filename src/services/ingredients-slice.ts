import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getIngredients, Ingredient } from "../utils/api";

export interface IngredientsState {
  items: Ingredient[];
  isLoading: boolean;
  error: string | null;
}

export const fetchIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("ingredients/fetchIngredients", async (_, { rejectWithValue }) => {
  try {
    const data = await getIngredients();
    if (!data.success) {
      return rejectWithValue(data.message || "Failed to fetch ingredients");
    }
    return data.data!;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<Ingredient[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to fetch ingredients";
      });
  },
});

export default ingredientsSlice.reducer;
