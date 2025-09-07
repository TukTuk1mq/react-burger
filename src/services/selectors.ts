import { RootState } from "./root-reducer";
import type { IngredientsState } from "./ingredients-slice";
import type { OrdersAllState } from "./orders-all-slice";
import type { OrdersUserState } from "./orders-user-slice";

export const getData = (state: RootState): IngredientsState =>
  state.ingredients;
export const getOrdersAll = (state: RootState): OrdersAllState =>
  state.ordersAll;
export const getOrdersUser = (state: RootState): OrdersUserState =>
  state.ordersUser;
export const getOrder = (state: RootState) => state.order;
export const getOrderDetails = (state: RootState) => state.orderDetails;
export const getUser = (state: RootState) => state.user;
