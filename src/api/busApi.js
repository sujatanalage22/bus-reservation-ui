// import axios from "axios";

// // Search buses from backend
// export const searchBuses = (form) => {
//   return axios.post("http://localhost:8080/api/routes/search", form);
  
// };
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/buses";

// ✅ ADMIN: Add new bus
export const addBus = (bus) => {
  return axios.post(BASE_URL, bus);
};

// ✅ ADMIN / USER: Get all buses
export const getAllBuses = () => {
  return axios.get(BASE_URL);
};

// ✅ USER: Search buses (routes search)
export const searchBuses = (form) => {
  return axios.post("http://localhost:8080/api/routes/search", form);
};
