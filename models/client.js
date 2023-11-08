import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  creditCardNumber: {
    type: Number,
    required: true
  },
  rate: {
    type: String,
    enum: ['GOOD', 'AVERAGE', 'BAD'],
    default: 'GOOD'
  }
});

export default model('Client', clientSchema);