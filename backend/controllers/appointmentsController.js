import appointmentModel from "../models/appointmentModel.js";

// Create an appointment
const createAppointment = async (req, res) => {
  const { petName, ownerName, contact, service, appointmentDate, appointmentTime } = req.body;
  
  try {
    // Assuming that the user is authenticated and req.user._id is available
    const newAppointment = new appointmentModel({
      userId: req.user._id, // Save the user ID in the appointment document
      petName,
      ownerName,
      contact,
      service,
      appointmentDate,
      appointmentTime,
    });

    await newAppointment.save();  // Save the appointment to the database
    res.status(201).json({ success: true, message: "Appointment booked successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error occurred while booking appointment" });
  }
};

// Get all appointments (Admin can view all appointments)
const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find();  // Admin sees all appointments
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error occurred while fetching appointments" });
  }
};

// Get appointments for the logged-in user (My Appointments for user)
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error occurred while fetching appointments" });
  }
};

// Get a specific appointment by ID
const getAppointment = async (req, res) => {
  const { id } = req.params;
  
  try {
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error occurred while fetching appointment" });
  }
};

// Delete an appointment by ID
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  
  try {
    const appointment = await appointmentModel.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Appointment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error occurred while deleting appointment" });
  }
};

export { createAppointment, getAppointments, getUserAppointments, getAppointment, deleteAppointment };
