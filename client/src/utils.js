import axios from "axios";

export const authFetch = axios.create({ baseURL: "https://localhost:5000/api" });

export const addLocalStorage = (user) => {
    return localStorage.setItem('user', JSON.stringify(user))
}

export const removeLoacalStorage = () => {
    return localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
