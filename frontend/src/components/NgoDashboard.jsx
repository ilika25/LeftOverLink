import React, { useEffect, useState } from 'react';
import api from '../api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function NgoDashboard() {
  const [ngo, setNgo] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchNgoData = async () => {
      try {
        const res = await api.get('/ngo/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNgo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNgoData();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get('/donation/active');
      setDonations(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleExpressInterest = async (id) => {
    const token = localStorage.getItem('token');
    try {
        await api.post(`/donation/interest/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Interest expressed!');
    } catch (err) {
        console.error(err);
        alert('Failed to express interest');
    }
  };

  useEffect(() => {
    fetchDonations(); // Load active donations initially
  }, []);

  useEffect(() => {
    socket.on('new-donation', (donation) => {
      alert(`New donation submitted!`);
      fetchDonations(); // safer: ensures donor is populated
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected`);
    });

    return () => {
      socket.off('new-donation');
      socket.off('disconnect');
    };
  }, []);

  if (!ngo) return <p>Loading ...</p>;

  return (
    <>
      <h1>Welcome, {ngo.NgoName}!</h1>
      <h2>Active Donations</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {donations.length === 0 ? (
          <p>No Active Donations</p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation._id}
              style={{
                border: '1px solid black',
                padding: '1rem',
                borderRadius: '8px',
                width: '300px'
              }}
            >
              <h3>{donation.foodType}</h3>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Pickup:</strong> {donation.pickupAddress}</p>
              <p><strong>Donor:</strong> {donation.donor?.DonorName || 'Unknown'}</p>
              <p><strong>Org:</strong> {donation.donor?.organisation || 'Individual'}</p>
              {donation.image && (
                <img
                  src={`http://localhost:3000/uploads/${donation.image}`}
                  alt='food'
                  style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                />
              )}
              <button style={{ marginTop: '10px' }} onSubmit={handleExpressInterest}>Express Interest</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
