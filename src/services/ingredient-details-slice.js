import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState: {
    item: null, 
  },
  reducers: {
    setIngredientDetails(state, action) {
      state.item = action.payload;
    },
  },
});

export default ingredientDetailsSlice.reducer;