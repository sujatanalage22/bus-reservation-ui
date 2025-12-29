// import axios from "axios";

// export const bookSeat = (payload) =>
//   axios.post("http://localhost:8080/api/bookings", payload);
// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/bookings";

// // Fetch all bookings (for admin)
// export const fetchBookings = () => {
//   return axios.get(BASE_URL);
// };

// // Existing function
// export const bookSeat = (data) => {
//   return axios.post(`${BASE_URL}`, data);
// };
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bookings";

// ✅ ADMIN: View all bookings
export const fetchBookings = () => {
  return axios.get(BASE_URL);
};

// ✅ USER: Book seat
export const bookSeat = (data) => {
  return axios.post(BASE_URL, data);
};
