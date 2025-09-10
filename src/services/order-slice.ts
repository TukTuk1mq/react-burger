import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postOrder, OrderResponse } from "../utils/api";

interface OrderState {
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
}

export const createOrder = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>("order/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    const data = await postOrder(ingredientIds);
    if (!data.success) {
      return rejectWithValue(data.message || "Failed to create order");
    }
    return data.order!.number;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const initialState: OrderState = {
  orderNumber: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderNumber = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.orderNumber = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error.message || "Failed to create order";
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
