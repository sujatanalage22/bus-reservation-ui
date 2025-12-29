// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/seats";

// export const fetchAvailableSeats = (busId) => {
//   return axios.get(`${BASE_URL}/available/${busId}`);
// };
// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/seats";

// // Fetch available seats for a bus
// export const fetchAvailableSeats = (busId) => {
//   return axios.get(`${BASE_URL}/available/${busId}`);
// };

// // Add seats for a bus (Admin)
// export const addSeats = ({ busId, seatCount }) => {
//   return axios.post(BASE_URL, { bus: { id: busId }, seatCount });
// };
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/seats";

// ADMIN
export const addSeats = ({ busId, seatCount }) => {
  return axios.post(`${BASE_URL}/add`, { busId, seatCount });
};

// // USER
// export const fetchAvailableSeats = (busId) => {
//   return axios.get(`${BASE_URL}/available/${busId}`);
// };


export const getBookedSeats = (busId) =>
  axios.get(`${BASE_URL}/booked/${busId}`);


