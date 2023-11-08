import { Schema, model } from 'mongoose';

// Création du schéma de contrat
const ContratSchema = new Schema({
  dateCreation: {
    type: Date,
    required: true
  },
  Signature: {
    type: String,
    required: true
  },
  dateDepart: {
    type: Date,
    required: true
  },
  dateRetour: {
    type: Date,
    required: true
  },
  kmDepart: {
    type: Number,
    required: true
  },
  kmRetour: {
    type: Number,
    required: true
  },
  montantAcompte: {
    type: Number,
    required: true
  },
  agenceRetour: {
    type: String,
    required: true
  }
});

// Création du modèle de contrat
const Contrat = model('Contrat', ContratSchema);

export default Contrat;
