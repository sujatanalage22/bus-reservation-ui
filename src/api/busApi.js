import API from "./config";

export const addBus = (bus) => {
  return API.post("/buses", bus);
};

export const getAllBuses = () => {
  return API.get("/buses");
};

export const searchBuses = (form) => {
  return API.post("/routes/search", form);
};
