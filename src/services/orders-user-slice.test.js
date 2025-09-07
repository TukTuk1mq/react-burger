import reducer, {
  userConnectionStart,
  userConnectionSuccess,
  userConnectionError,
  userConnectionClosed,
  userMessageReceived,
  userClearError,
  initialState,
} from "./orders-user-slice";

describe("orders-user-slice", () => {

  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initialState);
  });

  it("connection start/success", () => {
    const s1 = reducer(initialState, userConnectionStart({ url: "wss://x" }));
    expect(s1.connecting).toBe(true);
    const s2 = reducer(s1, userConnectionSuccess());
    expect(s2.connected).toBe(true);
    expect(s2.connecting).toBe(false);
  });

  it("error and clear", () => {
    const s1 = reducer(initialState, userConnectionError("boom"));
    expect(s1.error).toBe("boom");
    const s2 = reducer(s1, userClearError());
    expect(s2.error).toBe(null);
  });

  it("closed", () => {
    const s = reducer(
      {
        ...initialState,
        connected: true,
        connecting: true,
        error: "e",
        message: {},
      },
      userConnectionClosed()
    );
    expect(s.connected).toBe(false);
    expect(s.connecting).toBe(false);
    expect(s.error).toBe(null);
    expect(s.message).toBe(null);
  });

  it("message", () => {
    const payload = { success: true, orders: [], total: 1, totalToday: 1 };
    const s = reducer(initialState, userMessageReceived(payload));
    expect(s.message).toEqual(payload);
  });
});
