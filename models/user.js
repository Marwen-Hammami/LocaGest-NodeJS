<<<<<<< HEAD

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
=======
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
>>>>>>> origin/User
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
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
  }
 });
 export default model('User', userSchema);
=======
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  }
});

export default model('User', userSchema);
>>>>>>> origin/User
