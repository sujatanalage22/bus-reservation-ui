import { useEffect, useState } from "react";
import { getAllBuses } from "../../api/busApi";
import { addRoute } from "../../api/routeApi";
import "./AddBus.css";

export default function AddRoute() {
  const [buses, setBuses] = useState([]);
  const [route, setRoute] = useState({
    source: "",
    destination: "",
    travelDate: "",
    departureTime: "",
    busId: ""
  });

  useEffect(() => {
    getAllBuses().then(res => setBuses(res.data));
  }, []);

  const handleChange = (e) =>
    setRoute({ ...route, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!route.source || !route.destination || !route.travelDate || !route.departureTime || !route.busId) {
      alert("Please fill all fields");
      return;
    }

    await addRoute(route);
    alert("Route Added Successfully");

    setRoute({
      source: "",
      destination: "",
      travelDate: "",
      departureTime: "",
      busId: ""
    });
  };

  return (
    <div className="rb-form-page">
      <div className="rb-form-card">
        <h3>Add Route</h3>

        <div className="rb-row">
          <div className="rb-input-group">
            <label>Source City</label>
            <input
              name="source"
              placeholder="Enter source"
              value={route.source}
              onChange={handleChange}
            />
          </div>

          <div className="rb-input-group">
            <label>Destination City</label>
            <input
              name="destination"
              placeholder="Enter destination"
              value={route.destination}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="rb-row">
          <div className="rb-input-group">
            <label>Travel Date</label>
            <input
              type="date"
              name="travelDate"
              value={route.travelDate}
              onChange={handleChange}
            />
          </div>

          <div className="rb-input-group">
            <label>Departure Time</label>
            <input
              type="time"
              name="departureTime"
              value={route.departureTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="rb-input-group">
          <label>Select Bus</label>
          <select name="busId" value={route.busId} onChange={handleChange}>
            <option value="">Choose Bus</option>
            {buses.map(bus => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber}
              </option>
            ))}
          </select>
        </div>

        <button className="rb-submit-btn" onClick={handleSubmit}>
          🛣️ Add Route
        </button>
      </div>
    </div>
  );
}
