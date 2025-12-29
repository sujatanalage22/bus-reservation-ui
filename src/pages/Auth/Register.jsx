import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [adminKey, setAdminKey] = useState("");

  const register = async () => {
    try {
      await API.post(
        `/auth/register${adminKey ? `?adminKey=${adminKey}` : ""}`,
        user
      );
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Book bus tickets easily</p>

        <div className="input-group">
          <label>Name</label>
          <input
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* 🔑 Admin Secret (Optional) */}
        <div className="input-group">
          <label>Admin Secret Key (optional)</label>
          <input
            type="password"
            placeholder="Only for admin registration"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
          />
        </div>

        <button className="register-btn" onClick={register}>
          Register
        </button>

        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>
      </div>
    </div>
  );
}
