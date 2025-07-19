import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginDonor() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/donor/login", form);
      const token = res.data.token;

      sessionStorage.setItem("donorToken", token);
      sessionStorage.setItem("role", "donor");

      alert(res.data.message);
      navigate("/donor/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f9f9f9, #e0f7fa)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center", color: "#333" }}>
          Donor Login
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "0.75rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/donor/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
