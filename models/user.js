
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    default: null
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
    default: 'GOOD'
  },
  specialization: {
    type: String,
    default: null
  },
  phoneNumber : {
    type:String,
     default: null
  },
  image : {
    type:String,
     default: null
  },
  experience: {
    type: Number,
    default: null
  },
  roles: {
    type: String,
    enum: ['technicien', 'admin', 'client'],
    default: 'client'
  },
  isVerified : 
  {
    type : Boolean,
    default : false 
  },
  isBanned : 
  {
    type : Boolean,
    default : false 
  },
  token : 
  {
    type : String,
    default: null

  },
  resetToken: String,
  resetTokenExpiration: Date,
  otpCode: String,
  otpExpiration: Date
 });
 export default model('User', userSchema);