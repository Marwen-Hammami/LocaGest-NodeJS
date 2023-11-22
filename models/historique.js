import { Schema, model } from 'mongoose';

// Création de l'énumération
const StatutRes = Object.freeze({
  Reservee: 'Réservée',
  Payee: 'Payée',
  Achevee: 'Achevée'
});

// Création du schema 
const HistoriqueSchema = new Schema({
  IdRes: {
    type: Number,
    required: true
  },
  DateDebut: {
    type: Date,
    required: true
  },
  DateFin: {
    type: Date,
    required: true
  },
  Statut: {
    type: String,
    enum: Object.values(StatutRes),
    required: false
  },
  Total: {
    type: Number,
    required: true
  }
});

// Ajout de l'énumération au schema
Object.assign(HistoriqueSchema.statics, {
  StatutRes
});

// Création du modèle 
const Historique = model('Historique', HistoriqueSchema);

export default Historique;