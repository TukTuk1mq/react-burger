import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postOrder } from "../utils/api";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredientIds) => {
    const data = await postOrder(ingredientIds);
    return data.order.number;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    isLoading: false,
    error: null,
  },
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
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
