import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const [savedBooking, setSavedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state || !user?.id) {
      alert("User not logged in or booking info missing.");
      navigate("/search");
      return;
    }

    const { route, selectedSeats, fare } = state;

    if (!route?.id || !route?.bus?.id) {
      alert("Route or bus info missing. Please select seats again.");
      navigate("/search");
      return;
    }

    const saveBooking = async () => {
      try {
        // ✅ Correct payload: send only seat IDs
        const bookingPayload = {
          customerId: user.id,
          busId: route.bus.id,
          routeId: route.id,
          seatIds: selectedSeats.map(seat => seat.id), // <-- fix here
          totalAmount: fare || selectedSeats.length * 450
        };

        const res = await API.post("/bookings", bookingPayload);
        setSavedBooking(res.data);

      } catch (err) {
        const errorMsg = err.response?.data?.error || "Booking failed. Please try again.";
        alert("⚠️ Booking Failed\n\n" + errorMsg);
        navigate("/search");
      } finally {
        setLoading(false);
      }
    };

    saveBooking();
  }, [state, user, navigate]);

  if (loading) return <h2 className="center">Processing booking...</h2>;
  if (!savedBooking) return null;

  const { bus, route, seats, totalAmount } = savedBooking;

  return (
    <div className="success-page">
      <div className="ticket-card">
        <div className="ticket-header">
          <span className="check">✔</span>
          <h2>Payment Successful</h2>
        </div>

        <div className="ticket-row">
          <span>Bus</span>
          <span>{bus.busNumber} • {bus.busType}</span>
        </div>

        <div className="ticket-row">
          <span>Route</span>
          <span>{route.source} → {route.destination}</span>
        </div>

        <div className="ticket-row">
          <span>Seats</span>
          <span>{seats.map(s => s.seatNumber).join(", ")}</span>
        </div>

        <div className="ticket-total">
          Amount Paid <strong>₹{totalAmount}</strong>
        </div>

        <div className="ticket-actions">
          <button onClick={() => navigate("/my-bookings")}>My Bookings</button>
          <button onClick={() => navigate("/search")}>Book Again</button>
        </div>
      </div>
    </div>
  );
}
