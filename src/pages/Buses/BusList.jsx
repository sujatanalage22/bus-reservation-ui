import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchBuses } from "../../api/busApi"; // correct path
import "./BusList.css";

export default function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const travelDate = searchParams.get("travelDate");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        const res = await searchBuses({ source, destination, travelDate });
        setBuses(res.data);
      } catch (err) {
        console.error(err);
        setBuses([]);
      } finally {
        setLoading(false);
      }
    };

    if (source && destination && travelDate) fetchBuses();
    else setLoading(false);
  }, [source, destination, travelDate]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading buses...</h2>;
  if (!buses || buses.length === 0) return <h2 style={{ textAlign: "center" }}>No buses found</h2>;

  return (
    <div className="buslist-container">
      <h2 className="buslist-title">Available Buses</h2>
      {buses.map((route, idx) => (
        <div className="bus-card" key={idx}>
          {/* LEFT */}
          <div className="bus-left">
            <h3>{route.bus.busNumber}</h3>
            <p className="bus-type">{route.bus.busType}</p>
          </div>

          {/* CENTER */}
          <div className="bus-center">
            <div>
              <strong>{route.departureTime}</strong>
              <p>{route.source}</p>
            </div>
            <span className="duration">→</span>
            <div>
              <strong>{route.arrivalTime || "N/A"}</strong>
              <p>{route.destination}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bus-right">
            <p className="seats">{route.bus.totalSeats} Seats</p>
            <button
              className="view-seat-btn"
              onClick={() => navigate("/seats", { state: route })}
            >
              View Seats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
