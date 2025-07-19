import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function RegisterDonor() {
  const [form, setForm] = useState({
    DonorName: '', password: '', organisation: '',
    phone: '', email: '', address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/donor/register', form);
      alert(res.data.message);
      navigate('/donor/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h2 style={headingStyle}>Donor Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="DonorName"
            onChange={handleChange}
            placeholder="Full Name"
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="organisation"
            onChange={handleChange}
            placeholder="Organisation Name (optional)"
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  fontFamily: 'Segoe UI, sans-serif',
};

const formWrapperStyle = {
  backgroundColor: '#fff',
  padding: '3.5rem',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '440px',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};
