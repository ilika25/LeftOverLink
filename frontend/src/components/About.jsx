import React from 'react';

export default function About() {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>About Us</h1>
      <p style={taglineStyle}> <strong>Food Should Fill Stomachs, Not Bins 🥗</strong></p>

      <p style={textStyle}>
        <strong>LeftOverLink</strong> is a social impact platform that bridges the gap between food donors
        (like restaurants, canteens, and individuals) and NGOs that serve meals to those in need.
        Every day, countless meals are wasted while millions go hungry.
      </p>

      <p style={textStyle}>
        Our goal is to create a seamless, real-time donation system where leftover, surplus, or excess food
        can be shared instead of discarded. With just a few clicks, donors can post available food,
        and NGOs can claim and distribute it before it goes to waste.
      </p>

      <div style={highlightBox}>
        <p style={{ margin: 0 }}>
          🌍 <strong>Our Vision</strong>: A world where no food is wasted and no person sleeps hungry.
        </p>
        <p style={{ margin: '0.5rem 0 0' }}>
          🤝 <strong>Our Mission</strong>: To connect surplus to need - fast, safely, and compassionately.
        </p>
      </div>

      <p style={textStyle}>
        Whether you’re a college canteen, a wedding hall, or a concerned citizen with leftover food – your small act can be someone’s biggest meal.
      </p>

      <p style={{ fontStyle: 'italic', marginTop: '2rem', color: '#777' }}>
        Join us in building a sustainable future where food finds people, not landfills.
      </p>
    </div>
  );
}

//  Styles
const containerStyle = {
  padding: '4rem 2rem',
  fontFamily: 'Segoe UI, sans-serif',
  maxWidth: '800px',
  margin: '0 auto',
  lineHeight: 1.8,
  background: '#f9f9f9',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem',
  color: '#28a745',
  textAlign: 'center'
};

const taglineStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  marginBottom: '2rem',
  color: '#555'
};

const textStyle = {
  fontSize: '1.1rem',
  color: '#333',
  marginBottom: '1.5rem'
};

const highlightBox = {
  backgroundColor: '#e6ffe6',
  borderLeft: '6px solid #28a745',
  padding: '1rem 1.5rem',
  borderRadius: '8px',
  marginBottom: '2rem'
};
