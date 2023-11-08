import mongoose from "mongoose";

const { Schema, model } = mongoose;

const historiqueEntretienSchema = new Schema({
  ObjectId: Number,
  Date_entretien: Date,
  Description: String,
  Cout_reparation: Number,
  Vehicule_Type: String,
});

const HistoriqueEntretien = model('HistoriqueEntretien', historiqueEntretienSchema);

export default HistoriqueEntretien;
