import { combineReducers } from "@reduxjs/toolkit";
import ingredients from "./ingredients-slice";
import constructorBurger from "./constructor-slice";
import ingredientDetails from "./ingredient-details-slice";
import order from "./order-slice";
import user from "./user-slice";
import ordersAll from "./orders-all-slice"
import orderDetails from "./order-details-slice"
import ordersUser from "./orders-user-slice"

export const rootReducer = combineReducers({
  ingredients,
  constructorBurger,
  ingredientDetails,
  order,
  user,
  ordersAll,
  orderDetails,
  ordersUser
});

export type RootState = ReturnType<typeof rootReducer>;
