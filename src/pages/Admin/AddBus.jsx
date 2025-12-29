import { useState } from "react";
import { addBus } from "../../api/busApi";
import "./AddBus.css";

export default function AddBus() {
  const [bus, setBus] = useState({
    busNumber: "",
    busType: "",
    totalSeats: ""
  });

  const handleChange = (e) =>
    setBus({ ...bus, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await addBus(bus);
    alert("Bus Added Successfully");
    setBus({ busNumber: "", busType: "", totalSeats: "" });
  };

  return (
    <div className="rb-form-page">
      <div className="rb-form-card">
        <h3>Add New Bus</h3>

        <div className="rb-input-group">
          <label>Bus Number</label>
          <input
            name="busNumber"
            value={bus.busNumber}
            placeholder="MH12 AB 1234"
            onChange={handleChange}
          />
        </div>

        <div className="rb-input-group">
          <label>Bus Type</label>
          <select
            name="busType"
            value={bus.busType}
            onChange={handleChange}
          >
            <option value="">Select Bus Type</option>
            <option value="AC Sleeper">AC Sleeper</option>
            <option value="Non-AC Sleeper">Non-AC Sleeper</option>
            <option value="AC Seater">AC Seater</option>
            <option value="Non-AC Seater">Non-AC Seater</option>
          </select>
        </div>

        <div className="rb-input-group">
          <label>Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={bus.totalSeats}
            placeholder="40"
            onChange={handleChange}
          />
        </div>

        <button className="rb-submit-btn" onClick={handleSubmit}>
          ➕ Add Bus
        </button>
      </div>
    </div>
  );
}
