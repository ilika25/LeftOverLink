import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function DonorDashboard() {
  const [donor, setDonor] = useState(null);
  const [activeDonations, setActiveDonations] = useState([]);
  const [pastDonations, setPastDonations] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('donorToken');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (!token || role !== 'donor') {
      alert("Unauthorized access. Please log in again.");
      navigate('/donor/login');
      return;
    }

    const fetchDonorData = async () => {
      try {
        const res = await api.get('/donor/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonor(res.data);
      } catch (err) {
        console.error(err);
        alert("Session expired. Please log in again.");
        sessionStorage.clear();
        navigate('/donor/login');
      }
    };

    const fetchMyDonations = async () => {
      try {
        const res = await api.get('/donation/my-donations', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const all = res.data;
        setActiveDonations(all.filter(d => d.status === 'available'));
        setPastDonations(all.filter(d => d.status === 'claimed' || d.status === 'completed'));
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    fetchDonorData();
    fetchMyDonations();
  }, [navigate, token, role]);

  const handleApproveRequest = async (donationId, ngoId) => {
    try {
      await api.post(`/donation/approve/${donationId}`, { ngoId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("NGO approved successfully!");

      // Refresh donation lists
      const res = await api.get('/donation/my-donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const all = res.data;
      setActiveDonations(all.filter(d => d.status === 'available'));
      setPastDonations(all.filter(d => d.status === 'claimed' || d.status === 'completed'));
    } catch (err) {
      console.error(err);
      alert("Failed to approve NGO");
    }
  };

  if (!donor) return <p>Loading...</p>;

return (
  <div
    style={{
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      overflowY: 'auto',
    }}
  className='hide-scroll'>
    <h1 style={{ color: '#333' }}>Welcome, {donor.DonorName}!</h1>
    <h3 style={{ color: '#555', marginTop: '0.5rem' }}>
      Ready to make a difference? Fill out the food donation form now!
    </h3>

    <button
      onClick={() => navigate('/donationform', { state: { donor } })}
      style={{
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: '1.5rem 0',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      ➕ Donate Now
    </button>

    <h2 style={{ color: '#ff8c00', marginTop: '2rem' }}>📦 Your Active Donations</h2>
    {activeDonations.length === 0 ? (
      <p style={{ color: '#888' }}>No active donations yet.</p>
    ) : (
      activeDonations.map((donation) => (
        <div
          key={donation._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '1.5rem',
            margin: '1.5rem 0',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            backgroundColor: '#fff',
          }}
        >
          <h4 style={{ fontSize: '1.2rem' }}>
            🍽 {donation.foodType} ({donation.quantity})
          </h4>
          <p><strong>📍 Pickup:</strong> {donation.pickupAddress}</p>

          {donation.interestedNgos?.length > 0 ? (
            <>
              <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Interested NGOs:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {donation.interestedNgos.map((ngo, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem',
                      backgroundColor: '#fef9e7',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: '600' }}>{ngo.NgoName}</p>
                      <p style={{ margin: 0, color: '#777' }}>{ngo.address || 'No contact info'}</p>
                    </div>

                    {donation.claimedBy ? (
                      donation.claimedBy === ngo._id ? (
                        <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Accepted</span>
                      ) : null
                    ) : (
                      <button
                        onClick={() => handleApproveRequest(donation._id, ngo._id)}
                        style={{
                          padding: '8px 14px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        Accept Request
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ color: '#999' }}>No NGOs have shown interest yet.</p>
          )}
        </div>
      ))
    )}

    <h2 style={{ color: '#6a1b9a', marginTop: '3rem' }}>📜 Donation History</h2>
    {pastDonations.length === 0 ? (
      <p style={{ color: '#888' }}>No previous donations.</p>
    ) : (
      pastDonations.map((donation) => (
        <div
          key={donation._id}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '1.2rem',
            margin: '1rem 0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <h4>🍽 {donation.foodType} ({donation.quantity})</h4>
          <p><strong>📍 Pickup:</strong> {donation.pickupAddress}</p>
          <p><strong>📦 Status:</strong> {donation.status}</p>
          {donation.claimedBy && (
            <p><strong>🤝 Claimed By:</strong> {donation.claimedBy?.NgoName || 'Unknown NGO'}</p>
          )}
        </div>
      ))
    )}
  </div>
);
}
