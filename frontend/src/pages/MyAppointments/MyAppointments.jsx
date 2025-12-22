import React, { useContext, useEffect, useState } from 'react';
import './MyAppointments.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const MyAppointments = () => {
  
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(url + '/api/appointments/my-appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  return (
    <div className='my-appointments'>
      <h2>My Appointments</h2>
      <div className="container">
        {data.map((appointment, index) => {
          return (
            <div key={index} className='my-appointments-item'>
              <p><strong>Pet Name:</strong> {appointment.petName}</p>
              <p><strong>Service:</strong> {appointment.service}</p>
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p><span>&#x25cf;</span> <b>Status: {appointment.status || 'Scheduled'}</b></p>
              <button onClick={fetchAppointments}>Track Appointment</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
