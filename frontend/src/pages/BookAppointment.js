import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './BookAppointment.css';

const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [formData, setFormData] = useState({
    service: '',
    therapist: '',
    appointmentDate: '',
    timeSlot: '',
    patientNotes: ''
  });
  const navigate = useNavigate();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    fetchServices();
    fetchTherapists();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/services');
      setServices(res.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchTherapists = async () => {
    try {
      const res = await axios.get('/api/users/therapists');
      setTherapists(res.data.data);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', formData);
      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div className="book-appointment-page">
      <div className="container">
        <h1>Book an Appointment</h1>
        <p className="subtitle">Schedule your physiotherapy session</p>
        
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Select Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Choose a service...</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title} - ${service.price} ({service.duration} mins)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Therapist *</label>
            <select
              name="therapist"
              value={formData.therapist}
              onChange={handleChange}
              required
            >
              <option value="">Choose a therapist...</option>
              {therapists.map((therapist) => (
                <option key={therapist._id} value={therapist._id}>
                  {therapist.name} - {therapist.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Appointment Date *</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot *</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">Choose a time slot...</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              name="patientNotes"
              value={formData.patientNotes}
              onChange={handleChange}
              rows="4"
              placeholder="Any specific concerns or requirements..."
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;