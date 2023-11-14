
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  
  password: {
    type: String,
    required: true,
  },
  
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  creditCardNumber: {
    type: Number,
    default: null
  },
  rate: {
    type: String,
    enum: ['GOOD', 'AVERAGE', 'BAD'],
    default: null
  },
  specialization: {
    type: String,
    default: null
  },
  experience: {
    type: Number,
    default: null
  },
  Roles: {
    type: String,
    enum: ['technicien', 'admin', 'client'],
    default: 'client'
  },
  online: Boolean,
  image: String
 });
 export default model('User', userSchema);
