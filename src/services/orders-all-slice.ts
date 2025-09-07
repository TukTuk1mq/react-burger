import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderMessage {
  _id: string;
  number: number;
  name: string;
  status: "created" | "pending" | "done";
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
}

export interface OrdersAllMessage {
  success: boolean;
  orders: OrderMessage[];
  total: number;
  totalToday: number;
}

export interface OrdersAllState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  message: OrdersAllMessage | null;
}

export const initialState: OrdersAllState = {
  connected: false,
  connecting: false,
  error: null,
  message: null,
};

const ordersAllSlice = createSlice({
  name: "ordersAll",
  initialState,
  reducers: {
    connectionStart: (state, action: PayloadAction<{ url: string }>) => {
      state.connecting = true;
      state.error = null;
    },

    connectionSuccess: (state) => {
      state.connected = true;
      state.connecting = false;
      state.error = null;
    },

    connectionError: (state, action: PayloadAction<string>) => {
      state.connected = false;
      state.connecting = false;
      state.error = action.payload;
    },

    connectionClosed: (state) => {
      state.connected = false;
      state.connecting = false;
      state.error = null;
      state.message = null;
    },

    messageReceived: (state, action: PayloadAction<OrdersAllMessage>) => {
      state.message = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  }
});

export const {
  connectionStart,
  connectionSuccess,
  connectionError,
  connectionClosed,
  messageReceived,
  clearError,
} = ordersAllSlice.actions;

export default ordersAllSlice.reducer;

export const selectOrdersAll = (state: { ordersAll: OrdersAllState }) =>
  state.ordersAll;
export const selectOrdersAllConnected = (state: {
  ordersAll: OrdersAllState;
}) => state.ordersAll.connected;
export const selectOrdersAllError = (state: { ordersAll: OrdersAllState }) =>
  state.ordersAll.error;
export const selectOrdersAllMessage = (state: { ordersAll: OrdersAllState }) =>
  state.ordersAll.message;
