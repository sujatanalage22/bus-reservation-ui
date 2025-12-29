import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SeatSelection.css";

export default function SeatSelection() {
  const { state: route } = useLocation();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guard
  useEffect(() => {
    if (!route?.bus?.id) {
      navigate("/search");
    }
  }, [route, navigate]);

  const busId = route?.bus?.id;

  // ✅ CORRECT API CALL
  useEffect(() => {
    if (!busId) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/seats/bus/${busId}`)
      .then(res => setSeats(res.data))
      .catch(err => {
        console.error("Seat fetch failed", err);
        setSeats([]);
      })
      .finally(() => setLoading(false));
  }, [busId]);

  // ✅ SIMPLE TOGGLE (NO CONDITIONS)
  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, { id: seat.id, seatNumber: seat.seatNumber }]
    );
  };

  if (loading) return <h3 className="center">Loading seats...</h3>;

  return (
    <div className="seat-page">
      {/* HEADER */}
      <div className="seat-header">
        <button onClick={() => navigate(-1)}>← Back</button>
        <div>
          <h2>{route.bus.busNumber} • {route.bus.busType}</h2>
          <p>{route.source} → {route.destination}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="seat-container">
        <div className="seat-layout">
          <div className="driver">Driver</div>

          <div className="seat-grid">
            {seats.map(seat => (
              <div
                key={seat.id}
                className={`seat ${
                  selectedSeats.find(s => s.id === seat.id) ? "selected" : ""
                }`}
                onClick={() => toggleSeat(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="seat-summary">
          <h3>Booking Summary</h3>

          <p><strong>Selected Seats</strong></p>
          <div className="selected-box">
            {selectedSeats.length
              ? selectedSeats.map(s => s.seatNumber).join(", ")
              : "None"}
          </div>

          <p><strong>Total Seats:</strong> {selectedSeats.length}</p>
          <p><strong>Fare:</strong> ₹{selectedSeats.length * 450}</p>

          <button
            className="proceed-btn"
            disabled={!selectedSeats.length}
            onClick={() =>
              navigate("/payment", {
                state: {
                  route,
                  selectedSeats,
                  fare: selectedSeats.length * 450,
                },
              })
            }
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
