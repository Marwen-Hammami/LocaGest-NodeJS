import mongoose from "mongoose";

const { Schema, model } = mongoose;

const historiqueEntretienSchema = new Schema({
  immatriculation: String,
  cartype:String,
  titre:String,
  date_entretien: Date,
  description: String,
  cout_reparation: Number,
  image:String
});

const HistoriqueEntretien = model('HistoriqueEntretien', historiqueEntretienSchema);

export default HistoriqueEntretien;