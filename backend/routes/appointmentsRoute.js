import express from "express";
import { createAppointment, getAppointments, getAppointment, getUserAppointments } from "../controllers/appointmentsController.js";
import authMiddleware from "../middleware/auth.js";  // Import correctly

const appointmentRouter = express.Router();

// Create an appointment (POST)
appointmentRouter.post("/book", authMiddleware, createAppointment);

// Get all appointments (GET) - Admin only
appointmentRouter.get("/", authMiddleware, getAppointments);

// Get appointments for the logged-in user (GET) - User's "My Appointments" page
appointmentRouter.get("/my-appointments", authMiddleware, getUserAppointments);

// Get a specific appointment by ID (GET)
appointmentRouter.get("/:id", authMiddleware, getAppointment);

export default appointmentRouter;
