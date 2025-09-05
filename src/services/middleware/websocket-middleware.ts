import { Middleware, Action, UnknownAction, isAction } from "@reduxjs/toolkit";
import {
  connectionSuccess,
  connectionError,
  messageReceived,
  connectionStart,
  connectionClosed,
} from "../orders-all-slice";
import { OrderDetails } from "../order-details-slice";
import type { RootState } from "../store";

let socket: WebSocket | null = null;

export interface WebSocketOrderMessage {
  success: boolean;
  orders: OrderDetails[];
  total: number;
  totalToday: number;
}


export const websocketMiddleware: Middleware =
  (store) => (next) => (action: unknown) => {
    if (!isAction(action)) {
      return next(action);
    }

    const { dispatch } = store;

    if (connectionStart.match(action)) {
      const { url } = action.payload;

      try {
        socket = new WebSocket(url);

        socket.onopen = () => {
          dispatch(connectionSuccess());
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            dispatch(messageReceived(data));
          } catch (parseError) {
            console.error("Failed to parse WebSocket message:", parseError);
            dispatch(connectionError("Invalid message format"));
          }
        };

        socket.onerror = (error) => {
          dispatch(connectionError("WebSocket connection error"));
          console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
          if (!event.wasClean) {
            dispatch(
              connectionError(
                `Connection closed: ${event.code} ${event.reason}`
              )
            );
          }
        };
      } catch (error) {
        dispatch(connectionError("Failed to establish WebSocket connection"));
        console.error("WebSocket connection failed:", error);
      }
    }

    if (connectionClosed.match(action) && socket) {
      socket.close(1000, "Connection closed by client");
      socket = null;
    }

    return next(action);
  };
