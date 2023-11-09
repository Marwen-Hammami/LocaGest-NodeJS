import { Schema, model } from 'mongoose';

// Création du schéma de facture
const FactureSchema = new Schema({
  dateFacture: {
    type: Date,
    required: true
  },
  totalFacture: {
    type: Number,
    required: true
  },
  datePaiement: {
    type: Date,
    required: true
  }
});

// Création du modèle de facture
const Facture = model('Facture', FactureSchema);

export default Facture;
