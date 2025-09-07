import { AnyAction, Middleware, isAction } from "@reduxjs/toolkit";

export type WsActions<TMessage = any> = {
  connectionStart: (payload: { url: string }) => any;
  connectionSuccess: () => any;
  connectionError: (message: string) => any;
  connectionClosed: () => any;
  messageReceived: (message: TMessage) => any;
  sendMessage?: (data: unknown) => any;
};

const isOfType = (creator: { type: string }, action: AnyAction): boolean =>
  action && action.type === creator.type;

export const createSocketMiddleware = <TMessage = any>(
  actions: WsActions<TMessage>
): Middleware => {
  let socket: WebSocket | null = null;

  return () => (next) => (action: unknown) => {
    if (!isAction(action)) return next(action);

    const {
      connectionStart,
      connectionSuccess,
      connectionError,
      connectionClosed,
      messageReceived,
      sendMessage,
    } = actions;

    if (connectionStart && isOfType(connectionStart as any, action)) {
      const { url } = (action as any).payload as { url: string };
      try {
        socket = new WebSocket(url);

        socket.onopen = () => next(connectionSuccess());

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            next(messageReceived(data));
          } catch (e) {
            console.error("WS message parse error", e);
            next(connectionError("Invalid message format"));
          }
        };

        socket.onerror = (err) => {
          console.error("WS error", err);
          next(connectionError("WebSocket error"));
        };

        socket.onclose = (evt) => {
          if (!evt.wasClean && evt.code !== 1000) {
            next(connectionError(`Connection closed: ${evt.code}`));
          }
          next(connectionClosed());
          socket = null;
        };
      } catch (e) {
        console.error("WS open failed", e);
        next(connectionError("Failed to establish WebSocket connection"));
      }
    }

    if (connectionClosed && isOfType(connectionClosed as any, action) && socket) {
      socket.close(1000, "Client closed");
      socket = null;
    }

    if (
      sendMessage &&
      isOfType(sendMessage as any, action) &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      try {
        socket.send(JSON.stringify((action as any).payload));
      } catch (e) {
        console.error("WS send failed", e);
      }
    }

    return next(action);
  };
};
