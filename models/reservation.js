import { Schema, model } from 'mongoose';

// Création de l'énumération pour le statut de réservation
const StatutRes = Object.freeze({
  Reservee: 'Réservée',
  Payee: 'Payée',
  Achevee: 'Achevée'
});

// Création du schéma de réservation
const ReservationSchema = new Schema({
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
    required: true
  },
  Total: {
    type: Number,
    required: true
  }
});

// Ajout de l'énumération au schéma
Object.assign(ReservationSchema.statics, {
  StatutRes
});

// Création du modèle de réservation
const Reservation = model('Reservation', ReservationSchema);

export default Reservation;
