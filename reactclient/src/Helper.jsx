import { Link, useNavigate, useRouteError } from "react-router-dom";

// =========> Provise = Waiting <=========
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// ===========> Local storage reader <================
export const LocalStorageLoader = (jsonData) => {
  return JSON.parse(localStorage.getItem(jsonData));
};

// =========> Get = all items from local storage <=========
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = LocalStorageLoader(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// =========> Delete = item from local storage <=========
export const deleteItem = ({ key, id }) => {
  const existingData = LocalStorageLoader(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// =========> Loader = LocalStorageLoader <=========
export function userLoader() {
  const user = LocalStorageLoader("user");
  //   console.log(user);
  return { user };
}
