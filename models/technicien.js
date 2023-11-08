import { Schema, model } from 'mongoose';

const technicianSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  // Add any other attributes specific to technicians
});

export default model('Technician', technicianSchema);