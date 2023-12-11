import mongoose from "mongoose";

const { Schema, model } = mongoose;

const agenceSchema = new Schema({
  AgenceName: String,
  Adresse: String,
  
 longitude: Number,
 latitude: Number,
});

const Agence = model('Agence', agenceSchema);

export default Agence;