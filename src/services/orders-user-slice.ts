import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketOrderMessage } from "./ws-types";

export interface OrdersUserState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  message: WebSocketOrderMessage | null;
}

const initialState: OrdersUserState = {
  connected: false,
  connecting: false,
  error: null,
  message: null,
};

const ordersUserSlice = createSlice({
  name: "ordersUser",
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
    messageReceived: (state, action: PayloadAction<WebSocketOrderMessage>) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  connectionStart: userConnectionStart,
  connectionSuccess: userConnectionSuccess,
  connectionError: userConnectionError,
  connectionClosed: userConnectionClosed,
  messageReceived: userMessageReceived,
  clearError: userClearError,
} = ordersUserSlice.actions;

export default ordersUserSlice.reducer;
