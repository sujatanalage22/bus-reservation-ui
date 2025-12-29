import axios from "axios";

const API_URL = "http://localhost:8080/api/routes";

export const addRoute = (data) => {
  return axios.post(`${API_URL}/add`, data);
};

export const searchRoutes = (data) => {
  return axios.post(`${API_URL}/search`, data);
};
