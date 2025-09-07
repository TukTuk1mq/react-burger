import { setCookie, getCookie } from "./cookie";
import { request } from "./api";

export const getValidToken = (): string | null => {
  const token = getCookie("accessToken");

  if (!token) {
    return null;
  }

  if (typeof token !== "string" || token.trim() === "") {
    return null;
  }

  return token;
};

export const checkAndRefreshToken = async (): Promise<string | null> => {
  const token = getValidToken();

  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return await refreshToken();
    }

    const payload = JSON.parse(atob(parts[1]));
    const expiration = payload.exp * 1000;
    const now = Date.now();

    if (now > expiration - 300000) {
      return await refreshToken();
    }

    return token;
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return await refreshToken();
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    const data = await request<{
      success: boolean;
      accessToken: string;
      refreshToken: string;
      message?: string;
    }>("/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (data.success && data.accessToken) {
      let newToken = data.accessToken;
      if (newToken.startsWith("Bearer ")) {
        newToken = newToken.substring(7);
      }

      setCookie("accessToken", newToken);

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      return newToken;
    } else {
      console.error("Ошибка обновления токена:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    return null;
  }
};
