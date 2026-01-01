import axios from "axios";

const API = axios.create({
  baseURL: "https://bus-reservation-backend-0w0f.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
