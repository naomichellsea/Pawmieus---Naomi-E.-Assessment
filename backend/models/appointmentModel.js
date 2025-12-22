import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  ownerName: { type: String, required: true },
  contact: { type: String, required: true },
  service: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
}, { timestamps: true });

const appointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default appointmentModel;
