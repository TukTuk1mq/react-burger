import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";
import { request } from "../utils/api";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = getCookie("accessToken");
  const data = await request("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return data.user;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const token = getCookie("accessToken");
    const data = await request("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    const data = await request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, name }) => {
    const data = await request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    setCookie("accessToken", data.accessToken.split("Bearer ")[1]);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data.user;
  }
);

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isUserChecked: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserChecked(state) {
      state.isUserChecked = true;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.isUserChecked = true;
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
    },
    resetUserEdit(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isUserChecked = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuth = false;
        state.isUserChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, resetUserEdit, setUserChecked } = userSlice.actions;

export default userSlice.reducer;
