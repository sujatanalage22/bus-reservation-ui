import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./Register.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      // Save user/admin details in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
console.log("Logged in user:", res.data);

      // Check role and navigate accordingly
      if (res.data.role === "ADMIN") {
        alert("Admin Login Successful");
        navigate("/admin/dashboard"); // Admin dashboard
      } else {
        alert("Login Successful");
        navigate("/search"); // Normal user page
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <p className="subtitle">Access your account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="register-btn" type="submit">Login</button>

        <p className="login-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "#d32f2f" }}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
