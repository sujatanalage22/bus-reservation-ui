import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="rb-admin-container">
      {/* Header */}
      <header className="rb-admin-header">
        <h2>RedBus Admin Panel</h2>
        <button
          className="rb-logout"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      {/* Cards */}
      <div className="rb-admin-grid">
        <div className="rb-card" onClick={() => navigate("/admin/add-bus")}>
          <span className="rb-icon">🚌</span>
          <h3>Add Bus</h3>
          <p>Register new buses</p>
        </div>

        <div className="rb-card" onClick={() => navigate("/admin/add-seats")}>
          <span className="rb-icon">💺</span>
          <h3>Add Seats</h3>
          <p>Manage bus seating</p>
        </div>

        <div className="rb-card" onClick={() => navigate("/admin/add-route")}>
          <span className="rb-icon">🛣</span>
          <h3>Add Route</h3>
          <p>Create travel routes</p>
        </div>

        <div className="rb-card" onClick={() => navigate("/admin/view-bookings")}>
          <span className="rb-icon">📋</span>
          <h3>View Bookings</h3>
          <p>All customer bookings</p>
        </div>
      </div>
    </div>
  );
}
