import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "./constructor-slice";

interface IngredientDetailsState {
  item: Ingredient | null;
}

export const initialState: IngredientDetailsState = {
  item: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setIngredientDetails(state, action: PayloadAction<Ingredient>) {
      state.item = action.payload;
    },
  },
});

export const { setIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;

export type { IngredientDetailsState };
