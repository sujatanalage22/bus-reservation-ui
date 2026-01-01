import API from "./config";

// ADMIN
export const addSeats = ({ busId, seatCount }) => {
  return API.post("/seats/add", { busId, seatCount });
};

// USER
export const getBookedSeats = (busId) =>
  API.get(`/seats/booked/${busId}`);
