import { getCookie } from "./cookie";

export const BURGER_API_URL: string = "https://norma.nomoreparties.space/api";

export interface ApiError {
  message?: string;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: T;
  order?: {
    number: number;
  };
  orders?: T;
}

export const checkResponse = <T>(res: Response): Promise<ApiResponse<T>> => {
  if (res.ok) {
    return res.json() as Promise<ApiResponse<T>>;
  }
  return res.json().then((err: ApiError) => {
    throw new Error(err?.message || `Ошибка ${res.status}`);
  });
};

export function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetch(`${BURGER_API_URL}${endpoint}`, options).then(checkResponse<T>);
}

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface User {
  email: string;
  name: string;
}

export interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const WS_URL = "wss://norma.nomoreparties.space";

export const getIngredients = async (): Promise<ApiResponse<Ingredient[]>> =>
  request<Ingredient[]>("/ingredients");

export const postOrder = async (
  ingredientIds: string[]
): Promise<ApiResponse<OrderResponse>> => {
  const token = getCookie("accessToken");
  return request<OrderResponse>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
}

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<ApiResponse<User>> =>
  request<User>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<ApiResponse<User>> =>
  request<User>("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

export const fetchUser = async (token: string): Promise<ApiResponse<User>> =>
  request<User>("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

export const updateUser = async (
  userData: Partial<User>,
  token: string
): Promise<ApiResponse<User>> =>
  request<User>("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
