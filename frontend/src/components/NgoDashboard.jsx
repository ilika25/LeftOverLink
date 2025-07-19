import React, { useEffect, useState } from 'react';
import api from '../api';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000');

export default function NgoDashboard() {
  const [ngo, setNgo] = useState(null);
  const [donations, setDonations] = useState([]);
  const [interestedDonations, setInterestedDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('ngoToken');
    const role = sessionStorage.getItem('role');

    if (!token || role !== 'ngo') {
      alert("Unauthorized. Please login as NGO.");
      navigate('/ngo/login');
      return;
    }

    const fetchNgoData = async () => {
      try {
        const res = await api.get('/ngo/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNgo(res.data);
      } catch (err) {
        alert("Session expired. Please login again.");
        sessionStorage.removeItem('ngoToken');
        sessionStorage.removeItem('role');
        navigate('/ngo/login');
      }
    };

    fetchNgoData();
  }, [navigate]);

  const fetchDonations = async () => {
    try {
      const res = await api.get('/donation/active');
      const token = sessionStorage.getItem('ngoToken');
      const ngoId = JSON.parse(atob(token.split('.')[1])).id;

      const interested = res.data.filter(d =>
        d.interestedNgos?.some(n => n._id === ngoId)
      );

      const notInterested = res.data.filter(d =>
        !d.interestedNgos?.some(n => n._id === ngoId)
      );

      setDonations(notInterested);
      setInterestedDonations(interested);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpressInterest = async (id) => {
    const token = sessionStorage.getItem('ngoToken');
    try {
      await api.post(`/donation/interest/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Interest expressed!');
      fetchDonations();
    } catch (err) {
      console.error(err);
      alert('Failed to express interest');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    socket.on('new-donation', () => {
      alert(`🎉 New donation available!`);
      fetchDonations();
    });

    return () => {
      socket.off('new-donation');
    };
  }, []);

  if (!ngo) return <p>Loading...</p>;

  const cardStyle = {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    padding: '1.2rem',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out'
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  };

  const sectionTitle = {
  fontSize: '1.5rem',
  margin: '2rem 0 1rem',
  background: 'linear-gradient(to right, #e9933dff, #f1b42eff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};


  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#f2f7fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>Welcome, {ngo.NgoName}</h1>

      <h2 style={sectionTitle}>Available Donations</h2>
      {donations.length === 0 ? (
        <p>No active donations right now.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {donations.map((donation) => (
            <div key={donation._id} style={{ ...cardStyle, backgroundColor: '#e8fff1' }}>
              <h3>{donation.foodType}</h3>
              <p>📝 <em>{donation.description}</em></p>
              <p>📦 <strong>Qty:</strong> {donation.quantity}</p>
              <p>📍 <strong>Pickup:</strong> {donation.pickupAddress}</p>
              <p>👤 <strong>Donor:</strong> {donation.donor?.DonorName || 'Unknown'}</p>
              <p>🏢 <strong>Org:</strong> {donation.donor?.organisation || 'Individual'}</p>
              <button onClick={() => handleExpressInterest(donation._id)} style={buttonStyle}>
                ❤️ Express Interest
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 style={sectionTitle}>Pending Confirmation</h2>
      {interestedDonations.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {interestedDonations.map((donation) => (
            <div key={donation._id} style={{ ...cardStyle, backgroundColor: '#fff8e1' }}>
              <h3>{donation.foodType}</h3>
              <p>📦 <strong>Qty:</strong> {donation.quantity}</p>
              <p>📍 <strong>Pickup:</strong> {donation.pickupAddress}</p>
              <p>⏳ <strong>Status:</strong> Awaiting donor confirmation</p>
              <p>📝 <em>{donation.description}</em></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
