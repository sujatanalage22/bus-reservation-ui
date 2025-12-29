import { useEffect, useState } from "react";
import { fetchBookings } from "../../api/bookingApi";
import "./ViewBookings.css";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings().then(res => setBookings(res.data));
  }, []);

  return (
    <div className="rb-page">
      <h2 className="rb-title">All Bookings</h2>

      <div className="rb-table-wrapper">
        <table className="rb-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Bus</th>
              <th>Seats</th>
              <th>Booking Date</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="rb-empty">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.customer?.name}</td>
                  <td>{b.bus?.busNumber}</td>
                  <td>
                    {b.seats?.map(s => s.seatNumber).join(", ")}
                  </td>
                  <td>
                    {new Date(b.bookingDate).toLocaleString()}
                  </td>
                  <td>₹ {b.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
