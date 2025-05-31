import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructorBurger",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action) {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient) {
        return {
          payload: {
            ...ingredient,
            uuid: nanoid(),
          },
        };
      },
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== action.payload
      );
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const items = state.ingredients;
      const [removed] = items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, removed);
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;
export default constructorSlice.reducer;
