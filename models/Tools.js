import { Schema, model } from 'mongoose';

const toolsSchema = new Schema(
  {
    name: {
      type: String,      
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    marque: {
      type: String,      
      required: true,
    },
    type: {
      type: String,      
      required: true,
    },
    image: {
      type: String,      
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model('Tools', toolsSchema);
