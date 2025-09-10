import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";
import { request } from "../utils/api";
import type { User } from "../utils/api";

interface UserState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isUserChecked: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isUserChecked: false,
  error: null,
};

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie("accessToken");
      if (!token) return rejectWithValue("Токен не найден");

      const data = await request<User>("/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!data.success || !data.user) {
        return rejectWithValue(
          data.message || "Ошибка при получении данных пользователя"
        );
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Неизвестная ошибка"
      );
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await request<User>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!data.success || !data.user || !data.accessToken) {
      return rejectWithValue(data.message || "Ошибка входа");
    }

    let token = data.accessToken;
    if (token.startsWith("Bearer ")) {
      token = token.substring(7);
    }

    setCookie("accessToken", token);
    localStorage.setItem("refreshToken", data.refreshToken || "");
    return data.user;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка входа"
    );
  }
});

export const registerUser = createAsyncThunk<
  User,
  { email: string; password: string; name: string },
  { rejectValue: string }
>(
  "user/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const data = await request<User>("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!data.success || !data.user || !data.accessToken) {
        return rejectWithValue(data.message || "Ошибка регистрации");
      }

      let token = data.accessToken;
      if (token.startsWith("Bearer ")) {
        token = token.substring(7); 
      }

      setCookie("accessToken", token);
      localStorage.setItem("refreshToken", data.refreshToken || "");
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ошибка регистрации"
      );
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("user/updateUser", async (userData, { rejectWithValue }) => {
  try {
    const token = getCookie("accessToken");
    if (!token) return rejectWithValue("Токен не найден");

    const data = await request<User>("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!data.success || !data.user) {
      return rejectWithValue(data.message || "Ошибка обновления данных");
    }

    return data.user;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка обновления"
    );
  }
});

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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isUserChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка загрузки пользователя";
        state.isAuth = false;
        state.isUserChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка входа";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка регистрации";
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка обновления";
      });
  },
});

export const { logout, resetUserEdit, setUserChecked } = userSlice.actions;
export default userSlice.reducer;

export type { UserState };
