import { OrderDetails } from "./order-details-slice";

export interface WebSocketOrderMessage {
  success: boolean;
  orders: OrderDetails[];
  total: number;
  totalToday: number;
}

