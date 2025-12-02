import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/services');
      setServices(res.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;

  return (
    <div className="services-page">
      <div className="container">
        <h1>Our Services</h1>
        <p className="subtitle">Comprehensive physiotherapy treatments tailored to your needs</p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <span className="service-category">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-details">
                  <span className="duration">⏱ {service.duration} mins</span>
                  <span className="price">${service.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;