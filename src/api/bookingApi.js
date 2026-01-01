import API from "./config";

// ADMIN
export const fetchBookings = () => {
  return API.get("/bookings");
};

// USER
export const bookSeat = (data) => {
  return API.post("/bookings", data);
};
