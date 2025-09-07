import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { createSocketMiddleware } from "./middleware/socket-middleware";
import {
  connectionStart as allConnectionStart,
  connectionSuccess as allConnectionSuccess,
  connectionError as allConnectionError,
  connectionClosed as allConnectionClosed,
  messageReceived as allMessageReceived,
} from "./orders-all-slice";
import {
  userConnectionStart,
  userConnectionSuccess,
  userConnectionError,
  userConnectionClosed,
  userMessageReceived,
} from "./orders-user-slice";

const wsAllMiddleware = createSocketMiddleware({
  connectionStart: allConnectionStart,
  connectionSuccess: allConnectionSuccess,
  connectionError: allConnectionError,
  connectionClosed: allConnectionClosed,
  messageReceived: allMessageReceived,
});

const wsUserMiddleware = createSocketMiddleware({
  connectionStart: userConnectionStart,
  connectionSuccess: userConnectionSuccess,
  connectionError: userConnectionError,
  connectionClosed: userConnectionClosed,
  messageReceived: userMessageReceived,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsAllMiddleware, wsUserMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
