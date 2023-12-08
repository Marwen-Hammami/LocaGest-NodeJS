import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accidentSchema = new Schema({
  ObjectId: Number,
  Date_accident: Date,
  Description: String,
  Cout_reparation: Number,
  Vehicule: String,
});

const Accident = model('Accident', accidentSchema);

export default Accident;
