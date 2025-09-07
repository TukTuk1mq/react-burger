import reducer, {
  userConnectionStart,
  userConnectionSuccess,
  userConnectionError,
  userConnectionClosed,
  userMessageReceived,
  userClearError,
} from "./orders-user-slice";

describe("orders-user-slice", () => {
  const initial = {
    connected: false,
    connecting: false,
    error: null,
    message: null,
  };

  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initial);
  });

  it("connection start/success", () => {
    const s1 = reducer(initial, userConnectionStart({ url: "wss://x" }));
    expect(s1.connecting).toBe(true);
    const s2 = reducer(s1, userConnectionSuccess());
    expect(s2.connected).toBe(true);
    expect(s2.connecting).toBe(false);
  });

  it("error and clear", () => {
    const s1 = reducer(initial, userConnectionError("boom"));
    expect(s1.error).toBe("boom");
    const s2 = reducer(s1, userClearError());
    expect(s2.error).toBe(null);
  });

  it("closed", () => {
    const s = reducer(
      {
        ...initial,
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
    const s = reducer(initial, userMessageReceived(payload));
    expect(s.message).toEqual(payload);
  });
});
