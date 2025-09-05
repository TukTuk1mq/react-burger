import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { websocketMiddleware } from "./middleware/websocket-middleware";
import { websocketUserMiddleware } from "./middleware/websocket-user-middleware";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware, websocketUserMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
