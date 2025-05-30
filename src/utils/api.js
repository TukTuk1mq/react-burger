const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const getResponseData = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
// const getIngredients = () => {
//     return fetch(`${BURGER_API_URL}/ingredients`)
//       .then(getResponseData)
//       .then((data) => {
//         if (data?.success) return data.data;
//         return Promise.reject(data);
//       });
//   };

export const getIngredients = async () => {
  const response = await fetch(`${BURGER_API_URL}/ingredients`);
  if (!response.ok) {
    throw new Error("Ошибка загрузки данных");
  }
  return await response.json();
};
