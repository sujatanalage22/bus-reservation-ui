import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./BookingSuccess.css";

export default function BookingSuccess() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      alert("User not logged in");
      navigate("/login");
      return;
    }

    API.get(`/bookings/user/${userId}`)
      .then(res => setBookings(res.data))
      .finally(() => setLoading(false));
  }, [userId, navigate]);

  if (loading) return <h2 className="center">Loading...</h2>;
  if (bookings.length === 0) return <h2 className="center">No bookings found</h2>;

  return (
    <div className="success-page">
      <div className="success-container">
        <h1>Booking Confirmed! 🎉</h1>
        <p className="subtitle">Your tickets are ready</p>

        {bookings.map(b => (
          <div key={b.id} className="success-card">
            <div className="ticket-header">
              <h2>Bus {b.bus.busNumber}</h2>
              <span className="route">{b.route.source} → {b.route.destination}</span>
            </div>

            <div className="ticket-body">
              <p><b>Seats:</b></p>
              <div className="seats">
                {b.seats.map(s => (
                  <span key={s.seatNumber} className="seat">{s.seatNumber}</span>
                ))}
              </div>
              <p className="amount"><b>Total:</b> ₹{b.totalAmount}</p>
            </div>
          </div>
        ))}

        <button className="book-again-btn" onClick={() => navigate("/search")}>Book Again</button>
        <button className="home-btn" onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}
