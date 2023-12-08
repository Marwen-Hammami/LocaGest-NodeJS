import mongoose from "mongoose";

const { Schema, model } = mongoose;

const historiqueEntretienSchema = new Schema({
  immatriculation: String,
  date_entretien: Date,
  description: String,
  cout_reparation: Number,
  vehicule_type: String,
});

const HistoriqueEntretien = model('HistoriqueEntretien', historiqueEntretienSchema);

export default HistoriqueEntretien;
