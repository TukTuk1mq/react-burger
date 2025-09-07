import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { request, ApiResponse } from "../utils/api";

export interface OrderDetails {
  _id: string;
  number: number;
  name: string;
  status: "created" | "pending" | "done";
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
}

interface OrderDetailsState {
  order: OrderDetails | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: OrderDetailsState = {
  order: null,
  isLoading: false,
  error: null,
};

export const getOrderDetails = createAsyncThunk<
  OrderDetails,
  string,
  { rejectValue: string }
>("orderDetails/getOrder", async (orderId, { rejectWithValue }) => {
  try {
    const data = await request<{ orders: OrderDetails[] }>(
      `/orders/${orderId}`
    );

    if (
      !data.success ||
      !Array.isArray(data.orders) ||
      data.orders.length === 0
    ) {
      return rejectWithValue(data.message || "Заказ не найден");
    }

    return data.orders[0];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка при получении заказа"
    );
  }
});

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getOrderDetails.fulfilled,
        (state, action: PayloadAction<OrderDetails>) => {
          state.isLoading = false;
          state.order = action.payload;
        }
      )
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при загрузке заказа";
      });
  },
});

export const { clearOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
