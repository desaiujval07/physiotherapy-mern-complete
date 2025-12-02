import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="subtitle">Get in touch with us for any inquiries</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <h4>📍 Address</h4>
              <p>123 Health St, Medical City, MC 12345</p>
            </div>
            <div className="info-item">
              <h4>📞 Phone</h4>
              <p>+1 234 567 8900</p>
            </div>
            <div className="info-item">
              <h4>📧 Email</h4>
              <p>info@physiolife.com</p>
            </div>
            <div className="info-item">
              <h4>🕐 Hours</h4>
              <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
              <p>Sat: 9:00 AM - 2:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;