import { combineReducers } from "redux";
import ingredients from "./ingredients-slice";
import constructorBurger from "./constructor-slice";
import ingredientDetails from "./ingredient-details-slice";
import order from "./order-slice";

export const rootReducer = combineReducers({
  ingredients,
  constructorBurger,
  ingredientDetails,
  order,
});
