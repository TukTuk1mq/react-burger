import reducer, { createOrder, clearOrder, initialState } from "./order-slice";

describe("order-slice", () => {
  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initialState);
  });

  it("pending", () => {
    const s = reducer(initialState, { type: createOrder.pending.type });
    expect(s.isLoading).toBe(true);
    expect(s.error).toBe(null);
  });

  it("fulfilled", () => {
    const s = reducer(
      { ...initialState, isLoading: true },
      { type: createOrder.fulfilled.type, payload: 777 }
    );
    expect(s.isLoading).toBe(false);
    expect(s.orderNumber).toBe(777);
  });

  it("rejected", () => {
    const s = reducer(
      { ...initialState, isLoading: true },
      {
        type: createOrder.rejected.type,
        payload: "err",
        error: { message: "err" },
      }
    );
    expect(s.isLoading).toBe(false);
    expect(s.error).toBe("err");
  });

  it("clearOrder", () => {
    const s = reducer(
      { orderNumber: 1, isLoading: false, error: "e" },
      clearOrder()
    );
    expect(s.orderNumber).toBe(null);
    expect(s.error).toBe(null);
  });
});
