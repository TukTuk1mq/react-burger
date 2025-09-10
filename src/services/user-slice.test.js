import reducer, {
  setUserChecked,
  logout,
  resetUserEdit,
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
} from "./user-slice";

describe("user-slice", () => {
  const initial = {
    user: null,
    isAuth: false,
    isLoading: false,
    isUserChecked: false,
    error: null,
  };
  const user = { email: "a@b.c", name: "A" };

  it("initial", () => {
    expect(reducer(undefined, { type: "X" })).toEqual(initial);
  });

  it("setUserChecked", () => {
    const s = reducer(initial, setUserChecked());
    expect(s.isUserChecked).toBe(true);
  });

  it("logout", () => {
    const s = reducer({ ...initial, user, isAuth: true }, logout());
    expect(s.user).toBe(null);
    expect(s.isAuth).toBe(false);
    expect(s.isUserChecked).toBe(true);
  });

  it("resetUserEdit", () => {
    const s = reducer({ ...initial, error: "e" }, resetUserEdit());
    expect(s.error).toBe(null);
  });

  it("fetchUser.pending", () => {
    const s = reducer(initial, { type: fetchUser.pending.type });
    expect(s.isLoading).toBe(true);
  });

  it("fetchUser.fulfilled", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      { type: fetchUser.fulfilled.type, payload: user }
    );
    expect(s.isLoading).toBe(false);
    expect(s.user).toEqual(user);
    expect(s.isAuth).toBe(true);
    expect(s.isUserChecked).toBe(true);
  });

  it("fetchUser.rejected", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      {
        type: fetchUser.rejected.type,
        payload: "err",
        error: { message: "err" },
      }
    );
    expect(s.isLoading).toBe(false);
    expect(s.isUserChecked).toBe(true);
    expect(s.error).toBe("err");
  });

  it("loginUser.fulfilled", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      { type: loginUser.fulfilled.type, payload: user }
    );
    expect(s.user).toEqual(user);
    expect(s.isAuth).toBe(true);
  });

  it("loginUser.rejected", () => {
    const s = reducer(initial, {
      type: loginUser.rejected.type,
      payload: "err",
      error: { message: "err" },
    });
    expect(s.error).toBe("err");
  });

  it("registerUser.fulfilled", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      { type: registerUser.fulfilled.type, payload: user }
    );
    expect(s.user).toEqual(user);
    expect(s.isAuth).toBe(true);
  });

  it("updateUser.fulfilled", () => {
    const s = reducer(
      { ...initial, isLoading: true },
      { type: updateUser.fulfilled.type, payload: user }
    );
    expect(s.isLoading).toBe(false);
    expect(s.user).toEqual(user);
  });
});
