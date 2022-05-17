import axios from "axios";

export const authFetch = axios.create({ baseURL: "/api" });

export const removeLoacalStorage = () => {
  return localStorage.removeItem("user");
};


