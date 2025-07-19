import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../api";

export default function LoginNgo() {
  const [form, setForm] = useState({ NgoName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/ngo/login", form);
      sessionStorage.setItem("ngoToken", res.data.token);
      sessionStorage.setItem("role", "ngo");

      alert(res.data.message);
      navigate("/ngo/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        fontFamily: "Segoe UI, sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
          🏢 NGO Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="NGO Name"
            name="NgoName"
            onChange={handleChange}
            value={form.NgoName}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={form.email}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={form.password}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            🔐 Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/ngo/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Don’t have an account? Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#28a745",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};
