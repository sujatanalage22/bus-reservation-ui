import { useEffect, useState } from "react";
import { getAllBuses } from "../../api/busApi";
import { addSeats } from "../../api/seatApi";
import "./AddBus.css";

export default function AddSeats() {
  const [buses, setBuses] = useState([]);
  const [busId, setBusId] = useState("");
  const [seatCount, setSeatCount] = useState("");

  useEffect(() => {
    getAllBuses().then(res => setBuses(res.data));
  }, []);

  const handleSubmit = async () => {
    if (!busId || !seatCount) {
      alert("Please select bus and enter seat count");
      return;
    }

    await addSeats({ busId, seatCount });
    alert("Seats Added Successfully");

    setBusId("");
    setSeatCount("");
  };

  return (
    <div className="rb-form-page">
      <div className="rb-form-card">
        <h3>Add Seats</h3>

        <div className="rb-input-group">
          <label>Select Bus</label>
          <select value={busId} onChange={e => setBusId(e.target.value)}>
            <option value="">Choose Bus</option>
            {buses.map(bus => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="rb-input-group">
          <label>Seat Count</label>
          <input
            type="number"
            placeholder="Enter seat count"
            value={seatCount}
            onChange={e => setSeatCount(e.target.value)}
          />
        </div>

        <button className="rb-submit-btn" onClick={handleSubmit}>
          ➕ Add Seats
        </button>
      </div>
    </div>
  );
}
