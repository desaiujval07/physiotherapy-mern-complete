import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments');
      setAppointments(res.data.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await axios.delete(`/api/appointments/${id}`);
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      } catch (error) {
        toast.error('Failed to cancel appointment');
      }
    }
  };

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <div className="appointments-page">
      <div className="container">
        <h1>My Appointments</h1>
        
        {appointments.length === 0 ? (
          <div className="no-appointments">
            <p>You don't have any appointments yet.</p>
            <a href="/book-appointment" className="btn-primary">Book an Appointment</a>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.service.title}</h3>
                  <span className={`status ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
                
                <div className="appointment-details">
                  <p><strong>Date:</strong> {format(new Date(appointment.appointmentDate), 'PPP')}</p>
                  <p><strong>Time:</strong> {appointment.timeSlot}</p>
                  <p><strong>Therapist:</strong> {appointment.therapist.name}</p>
                  <p><strong>Duration:</strong> {appointment.service.duration} minutes</p>
                  <p><strong>Price:</strong> ${appointment.service.price}</p>
                  {appointment.patientNotes && (
                    <p><strong>Notes:</strong> {appointment.patientNotes}</p>
                  )}
                </div>
                
                {appointment.status === 'pending' && (
                  <div className="appointment-actions">
                    <button 
                      onClick={() => handleCancel(appointment._id)}
                      className="btn-danger"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;