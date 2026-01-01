import API from "./config";

export const registerUser = (user) =>
  API.post("/auth/register", user);

export const loginUser = (user) =>
  API.post("/auth/login", user);
