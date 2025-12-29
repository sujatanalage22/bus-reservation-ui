import { useNavigate } from "react-router-dom";

export default function BusCard({ bus }) {
  const navigate = useNavigate();

  return (
    <div className="bus-card">
      <h3>{bus.busName}</h3>
      <p>Departure: {bus.departureTime}</p>
      <button onClick={() => navigate("/seats", { state: bus })}>
        View Seats
      </button>
    </div>
  );
}
