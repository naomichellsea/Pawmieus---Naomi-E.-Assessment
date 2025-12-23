import express from "express";
import { createAppointment, getAppointments, getAppointment, getUserAppointments } from "../controllers/appointmentsController.js";
import authMiddleware from "../middleware/auth.js";  

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authMiddleware, createAppointment);

//all appointments, Admin only
appointmentRouter.get("/", authMiddleware, getAppointments);

appointmentRouter.get("/my-appointments", authMiddleware, getUserAppointments);

//Get a specific appointment by ID 
appointmentRouter.get("/:id", authMiddleware, getAppointment);

export default appointmentRouter;
