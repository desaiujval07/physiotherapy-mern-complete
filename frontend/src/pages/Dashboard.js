import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsRes, servicesRes, contactsRes, testimonialsRes] = await Promise.all([
        axios.get('/api/appointments'),
        axios.get('/api/services'),
        axios.get('/api/contact'),
        axios.get('/api/testimonials/all')
      ]);
      
      setAppointments(appointmentsRes.data.data);
      setServices(servicesRes.data.data);
      setContacts(contactsRes.data.data);
      setTestimonials(testimonialsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      await axios.put(`/api/testimonials/${id}/approve`);
      toast.success('Testimonial approved');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve testimonial');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${id}`);
        toast.success('Service deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'appointments' ? 'active' : ''}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments ({appointments.length})
          </button>
          <button 
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            Services ({services.length})
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts ({contacts.length})
          </button>
          <button 
            className={activeTab === 'testimonials' ? 'active' : ''}
            onClick={() => setActiveTab('testimonials')}
          >
            Testimonials ({testimonials.length})
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'appointments' && (
            <div className="appointments-section">
              <h2>All Appointments</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Service</th>
                      <th>Therapist</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt._id}>
                        <td>{apt.patient.name}</td>
                        <td>{apt.service.title}</td>
                        <td>{apt.therapist.name}</td>
                        <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                        <td>{apt.timeSlot}</td>
                        <td><span className={`status ${apt.status}`}>{apt.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-section">
              <h2>All Services</h2>
              <div className="services-grid">
                {services.map((service) => (
                  <div key={service._id} className="service-item">
                    <h3>{service.title}</h3>
                    <p>{service.category}</p>
                    <p>${service.price} - {service.duration} mins</p>
                    <button onClick={() => handleDeleteService(service._id)} className="btn-danger">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Contact Submissions</h2>
              <div className="contacts-list">
                {contacts.map((contact) => (
                  <div key={contact._id} className="contact-item">
                    <h3>{contact.subject}</h3>
                    <p><strong>From:</strong> {contact.name} ({contact.email})</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <p><strong>Date:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="testimonials-section">
              <h2>Testimonials</h2>
              <div className="testimonials-list">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="testimonial-item">
                    <p>"{testimonial.comment}"</p>
                    <p><strong>By:</strong> {testimonial.patient.name}</p>
                    <p><strong>Rating:</strong> {'⭐'.repeat(testimonial.rating)}</p>
                    <p><strong>Status:</strong> {testimonial.isApproved ? 'Approved' : 'Pending'}</p>
                    {!testimonial.isApproved && (
                      <button 
                        onClick={() => handleApproveTestimonial(testimonial._id)}
                        className="btn-success"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;