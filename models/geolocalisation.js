import mongoose from "mongoose";

const { Schema, model } = mongoose;

const geolocalisationSchema = new Schema({
  ObjectId: Number,
  Coord_GPS: String,
  Date: Date,
  Heure: String,
  Vehicule: String,
});

const Geolocalisation = model('Geolocalisation', geolocalisationSchema);

export default Geolocalisation;
