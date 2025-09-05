import { RootState } from "./root-reducer";
import type { IngredientsState } from "./ingredients-slice";

export const getData = (state: RootState): IngredientsState =>
  state.ingredients;
