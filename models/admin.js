import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

export default model('Admin', adminSchema);