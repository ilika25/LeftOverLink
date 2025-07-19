import React, { useState, useEffect } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Donationform() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDonor = location.state?.donor;

  const [donor, setDonor] = useState(initialDonor || null);
  const [form, setForm] = useState({
    foodType: "",
    description: "",
    quantity: "",
    pickupAddress: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("donorToken");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "donor") {
      alert("Unauthorized access. Only donors can access this page.");
      navigate("/donor/login");
      return;
    }

    if (!donor) {
      const fetchDonor = async () => {
        try {
          const res = await api.get("/donor/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDonor(res.data);
        } catch (err) {
          alert("Session expired! Please login again.");
          sessionStorage.removeItem("donorToken");
          sessionStorage.removeItem("role");
          navigate("/donor/login");
        }
      };
      fetchDonor();
    }
  }, [donor, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      e.target.value = null;
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("donorToken");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "donor") {
      alert("Unauthorized. Only donors can submit donations.");
      navigate("/donor/login");
      return;
    }

    const formData = new FormData();
    formData.append("foodType", form.foodType);
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("pickupAddress", form.pickupAddress);
    if (image) formData.append("image", image);

    try {
      await api.post("/donation/submit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Donation submitted successfully!");
      setForm({
        foodType: "",
        description: "",
        quantity: "",
        pickupAddress: "",
      });
      setImage(null);
    } catch (err) {
      alert("Error submitting donation. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>🍽 Food Donation Form</h2>

        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>👤 Donor Info</legend>

          <label style={styles.label}>Donor Name</label>
          <input type="text" value={donor?.DonorName || ""} readOnly style={styles.input} />

          <label style={styles.label}>Email</label>
          <input type="email" value={donor?.email || ""} readOnly style={styles.input} />

          <label style={styles.label}>Phone</label>
          <input type="number" value={donor?.phone || ""} readOnly style={styles.input} />

          <label style={styles.label}>Organisation</label>
          <input
            type="text"
            value={donor?.organisation || "Not Applicable"}
            readOnly
            style={styles.input}
          />
        </fieldset>

        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>📦 Food Details</legend>

          <label style={styles.label}>Food Type</label>
          <select name="foodType" value={form.foodType} onChange={handleChange} required style={styles.select}>
            <option value="">Select food option</option>
            <option value="Cooked">Cooked</option>
            <option value="Uncooked">Uncooked</option>
            <option value="Packed">Packed</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>

          <label style={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Pickup Address</label>
          <textarea
            name="pickupAddress"
            value={form.pickupAddress}
            onChange={handleChange}
            required
            rows={3}
            style={{ ...styles.input, resize: "vertical" }}
          ></textarea>

          <label style={styles.label}>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        </fieldset>

        <button type="submit" style={styles.submitBtn}>
          Submit Donation
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    background: "#f4f4f4",
    minHeight: "100vh",
  },
  form: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "700px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#333",
    textAlign: "center",
  },
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  legend: {
    fontWeight: "bold",
    padding: "0 0.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    marginTop: "1rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  submitBtn: {
    marginTop: "1.5rem",
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s ease",
  },
};
