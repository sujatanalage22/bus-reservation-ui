import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    source: "",
    destination: "",
    travelDate: ""
  });

  // Pre-fill from query params if available
  useEffect(() => {
    const source = searchParams.get("source") || "";
    const destination = searchParams.get("destination") || "";
    const travelDate = searchParams.get("travelDate") || "";
    setForm({ source, destination, travelDate });
  }, [searchParams]);

  const handleSearch = () => {
    if (!form.source || !form.destination || !form.travelDate) {
      alert("Please fill all fields");
      return;
    }

    navigate(
      `/buses?source=${encodeURIComponent(form.source)}&destination=${encodeURIComponent(form.destination)}&travelDate=${form.travelDate}`
    );
  };

  return (
    <div className="search-container">
      <div className="search-card">
        <h2>Book Bus Tickets</h2>

        <input
          placeholder="From"
          value={form.source}
          onChange={e => setForm({ ...form, source: e.target.value })}
        />

        <input
          placeholder="To"
          value={form.destination}
          onChange={e => setForm({ ...form, destination: e.target.value })}
        />

        <input
          type="date"
          value={form.travelDate}
          onChange={e => setForm({ ...form, travelDate: e.target.value })}
        />

        <button className="search-btn" onClick={handleSearch}>
          Search Buses
        </button>
      </div>
    </div>
  );
}
