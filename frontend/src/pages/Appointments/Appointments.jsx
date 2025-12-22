import React, { useState, useContext } from 'react'; // 1. Added useContext
import './Appointments.css';
import { StoreContext } from '../../Context/StoreContext'; // 2. Added StoreContext import

const Appointments = () => {
  // 3. Get the correct URL (http://localhost:3000) from your Context
  const { url } = useContext(StoreContext);

  // Form state
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState('Grooming');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  
  // Message & token state
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Debug log for token
  console.log('Token being sent:', token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Check token
    if (!token) {
      setConfirmationMessage('You must login first to book an appointment.');
      return;
    }

    // Step 2: Construct appointment data
    const appointmentData = {
      petName,
      ownerName,
      contact,
      service,
      appointmentDate,
      appointmentTime
    };

    console.log('Booking Data:', appointmentData);

    try {
      // Step 3: Send fetch request
      // FIX: Changed hardcoded 'http://localhost:4000' to dynamic `${url}`
      const response = await fetch(`${url}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      // Step 4: Parse response
      const data = await response.json();

      if (response.ok) {
        // Booking successful
        setConfirmationMessage(data.message || 'Your appointment has been booked successfully!');
        // Optionally reset form
        setPetName('');
        setOwnerName('');
        setContact('');
        setService('Grooming');
        setAppointmentDate('');
        setAppointmentTime('');
      } else {
        // Backend returned an error (401, 400, etc.)
        console.error('Booking failed:', data);
        setConfirmationMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      // Network error or unexpected exception
      console.error('Fetch error:', error);
      setConfirmationMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="appointments-container">
      <div className="heading-section">
        <h6 className="text-primary text-uppercase">Book an Appointment</h6>
        <h1 className="display-5 text-uppercase mb-0">Reserve a Spot for Your Furry Friend!</h1>
      </div>
      
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Pet Name"
          required
        />
        
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Owner Name"
          required
        />
        
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
          required
        />
        
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="Grooming">Grooming</option>
          <option value="Bath">Bath</option>
          <option value="Nail Trim">Nail Trim</option>
        </select>
        
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        
        <button type="submit">Book Appointment</button>
      </form>

      {confirmationMessage && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}
    </div>
  );
};

export default Appointments;