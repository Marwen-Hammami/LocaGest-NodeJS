import { Schema, model } from 'mongoose';

const distributionSchema = new Schema(
  {
    typeRepair: {
      type: String,
      default: "",
      enum: ["Maintenance", "Repair", "Car Wash"],
    },
    pieces: {
      type: Schema.Types.ObjectId,
      ref: "Tools",
    },
    cars: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    description: {
      type: String,      
      required: true,
    },
    technicien: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  
    statusCar: {
      type: String,
      default: "In progress",
      enum: ["In progress", "Delivered"],
    },
  },
  {
    timestamps: true,
  }
);
export default model('Distribution', distributionSchema);

