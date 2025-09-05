import { Middleware, isAction } from "@reduxjs/toolkit";
import {
  userConnectionStart,
  userConnectionSuccess,
  userConnectionError,
  userMessageReceived,
  userConnectionClosed,
} from "../orders-user-slice";
import { checkAndRefreshToken } from "../../utils/auth";
import { WS_URL } from "../../utils/api";

let userSocket: WebSocket | null = null;
let hasRetriedToken = false;

export const websocketUserMiddleware: Middleware =
  (store) => (next) => (action: unknown) => {
    if (!isAction(action)) {
      return next(action);
    }

    const { dispatch } = store;

    if (userConnectionStart.match(action)) {
      const { url } = action.payload;
      hasRetriedToken = false;

      if (userSocket) {
        userSocket.close(1000, "New user connection started");
        userSocket = null;
      }

      try {
        userSocket = new WebSocket(url);

        userSocket.onopen = () => {
          dispatch(userConnectionSuccess());
          hasRetriedToken = false;
        };

        userSocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (
              data &&
              data.success === false &&
              typeof data.message === "string" &&
              data.message === "Invalid or missing token"
            ) {
              console.warn("WS: invalid or missing token, attempting refresh...");
              if (!hasRetriedToken) {
                hasRetriedToken = true;
                (async () => {
                  const newToken = await checkAndRefreshToken();
                  if (newToken) {
                    const clean = newToken.replace(/^Bearer\s+/i, "").trim();
                    const newUrl = `${WS_URL}/orders?token=${encodeURIComponent(
                      clean
                    )}`;
                    try {
                      if (userSocket) {
                        userSocket.close(1000, "Retry with refreshed token");
                        userSocket = null;
                      }
                    } catch (_) {}

                    dispatch(userConnectionStart({ url: newUrl }));
                    return;
                  }
                  dispatch(userConnectionError("Invalid or missing token"));
                })();
                return;
              }
              dispatch(userConnectionError("Invalid or missing token"));
              return;
            }

            if (data && data.success && Array.isArray(data.orders)) {
              dispatch(userMessageReceived(data));
            } else {
              console.error("Invalid WebSocket message format:", data);
              dispatch(
                userConnectionError("Invalid message format from server")
              );
            }
          } catch (error) {
            dispatch(userConnectionError("Invalid message format"));
          }
        };

        userSocket.onerror = (error) => {
          dispatch(userConnectionError("Connection error"));
        };

        userSocket.onclose = (event) => {
          if (!event.wasClean && event.code !== 1000) {
            dispatch(userConnectionError(`Connection closed: ${event.code}`));
          }
          userSocket = null;
        };
      } catch (error) {
        dispatch(userConnectionError("Failed to establish connection"));
      }
    }

    if (userConnectionClosed.match(action) && userSocket) {
      userSocket.close(1000, "Connection closed by client");
      userSocket = null;
    }

    return next(action);
  };
