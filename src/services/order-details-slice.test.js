import reducer, {
  getOrderDetails,
  clearOrderDetails,
} from "./order-details-slice";

describe("order-details-slice", () => {
  const initial = { order: null, isLoading: false, error: null };
  const order = {
    _id: "1",
    number: 42,
    name: "Test",
    status: "done",
    createdAt: "",
    updatedAt: "",
    ingredients: [],
  };

  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initial);
  });

  it("pending", () => {
    const s = reducer(initial, { type: getOrderDetails.pending.type });
    expect(s.isLoading).toBe(true);
    expect(s.error).toBe(null);
  });

  it("fulfilled", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      { type: getOrderDetails.fulfilled.type, payload: order }
    );
    expect(s.isLoading).toBe(false);
    expect(s.order).toEqual(order);
  });

  it("rejected", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      {
        type: getOrderDetails.rejected.type,
        payload: "err",
        error: { message: "err" },
      }
    );
    expect(s.isLoading).toBe(false);
    expect(s.error).toBe("err");
  });

  it("clearOrderDetails", () => {
    const s = reducer(
      { order, isLoading: false, error: "e" },
      clearOrderDetails()
    );
    expect(s.order).toBe(null);
    expect(s.error).toBe(null);
  });
});
