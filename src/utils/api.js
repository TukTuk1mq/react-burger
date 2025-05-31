const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message || `Ошибка ${res.status}`);
  });
};

export function request(endpoint, options) {
  return fetch(`${BURGER_API_URL}${endpoint}`, options).then(checkResponse);
}

export const getIngredients = async () => request("/ingredients");

export const postOrder = async (ingredientIds) =>
  request("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
