import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Therapists.css';

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const res = await axios.get('/api/users/therapists');
      setTherapists(res.data.data);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading therapists...</div>;

  return (
    <div className="therapists-page">
      <div className="container">
        <h1>Our Expert Therapists</h1>
        <p className="subtitle">Meet our team of certified physiotherapy professionals</p>
        
        <div className="therapists-grid">
          {therapists.map((therapist) => (
            <div key={therapist._id} className="therapist-card">
              <div className="therapist-image">
                <img src={therapist.avatar} alt={therapist.name} />
              </div>
              <div className="therapist-content">
                <h3>{therapist.name}</h3>
                <p className="specialization">{therapist.specialization}</p>
                <p className="experience">{therapist.experience} years of experience</p>
                {therapist.bio && <p className="bio">{therapist.bio}</p>}
                <div className="contact-info">
                  <p>📧 {therapist.email}</p>
                  <p>📞 {therapist.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Therapists;