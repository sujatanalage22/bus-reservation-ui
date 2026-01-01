import API from "./config";

export const adminLogin = (data) => {
  return API.post("/auth/login", data);
};
