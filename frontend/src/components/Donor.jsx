import { useNavigate } from "react-router-dom";

export default function Donor() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Welcome to the Donor Community
      </h1>

      <button
        onClick={() => navigate("/donor/login")}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "0.8rem",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Login
      </button>
    </div>
  );
}
