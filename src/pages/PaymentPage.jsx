import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("CARD");

  // Redirect if route info is missing
  useEffect(() => {
    if (!state?.route) navigate("/search");
  }, [state, navigate]);

  if (!state?.route) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Invalid access</h2>;

  const { route, selectedSeats = [], fare = 0 } = state;
  const { bus, source, destination, travelDate } = route;

  const seatNumbers = selectedSeats.map(s => s.seatNumber).join(", ");

  const handlePay = () => {
    // Navigate to PaymentSuccess with booking info
    navigate("/payment-success", {
      state: {
        route,
        selectedSeats,
        fare,
      },
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-summary">
        <h3>Trip Summary</h3>
        <p>Bus: {bus.busNumber} • {bus.busType}</p>
        <p>Route: {source} → {destination}</p>
        <p>Date: {travelDate}</p>
        <p>Seats: {seatNumbers}</p>
        <h2>Total: ₹{fare}</h2>
      </div>

      <div className="payment-box">
        <h3>Payment Method</h3>

        <div className="payment-tabs">
          <button className={paymentMethod === "CARD" ? "active" : ""} onClick={() => setPaymentMethod("CARD")}>💳 Card</button>
          <button className={paymentMethod === "UPI" ? "active" : ""} onClick={() => setPaymentMethod("UPI")}>📱 UPI</button>
        </div>

        <div className="payment-form">
          {paymentMethod === "CARD" && (
            <>
              <input type="text" placeholder="Card Number" />
              <div className="row">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
              </div>
              <input type="text" placeholder="Card Holder Name" />
            </>
          )}

          {paymentMethod === "UPI" && (
            <input type="text" placeholder="Enter UPI ID" />
          )}
        </div>

        <button className="pay-btn" onClick={handlePay}>
          Pay ₹{fare}
        </button>
      </div>
    </div>
  );
}
