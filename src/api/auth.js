import api from "./axios";

export const loginAPI = (username, password) =>
  api.post("token/", { username, password });

export const refreshTokenAPI = (refresh) =>
  api.post("token/refresh/", { refresh });