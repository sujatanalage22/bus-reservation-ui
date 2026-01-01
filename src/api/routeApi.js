import API from "./config";

export const addRoute = (data) => {
  return API.post("/routes/add", data);
};

export const searchRoutes = (data) => {
  return API.post("/routes/search", data);
};
