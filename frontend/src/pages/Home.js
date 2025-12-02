import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/api/testimonials');
      setTestimonials(res.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to PhysioLife</h1>
            <p>Expert Physiotherapy Care for Your Recovery Journey</p>
            <Link to="/book-appointment" className="btn-primary">Book Appointment</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Expert Therapists</h3>
              <p>Certified professionals with years of experience</p>
            </div>
            <div className="feature-card">
              <h3>Modern Equipment</h3>
              <p>State-of-the-art facilities and technology</p>
            </div>
            <div className="feature-card">
              <h3>Personalized Care</h3>
              <p>Customized treatment plans for each patient</p>
            </div>
            <div className="feature-card">
              <h3>Flexible Scheduling</h3>
              <p>Convenient appointment times to fit your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2>Our Services</h2>
          <p>Comprehensive physiotherapy solutions for all your needs</p>
          <Link to="/services" className="btn-secondary">View All Services</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Patients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="testimonial-card">
                <p>"{testimonial.comment}"</p>
                <h4>{testimonial.patient.name}</h4>
                <div className="rating">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;