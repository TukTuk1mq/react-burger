import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

interface ConstructorState {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructorBurger",
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<ConstructorIngredient>) {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: Ingredient) {
        return {
          payload: {
            ...ingredient,
            uuid: nanoid(),
          },
        };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== action.payload
      );
    },
    moveIngredient(state, action: PayloadAction<{dragIndex: number, hoverIndex: number}>) {
      const { dragIndex, hoverIndex } = action.payload;
      const items = state.ingredients;
      const [removed] = items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, removed);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;

export type { Ingredient, ConstructorIngredient, ConstructorState };
