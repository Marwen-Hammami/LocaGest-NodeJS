import { Schema, model } from 'mongoose';

// Création de l'énumération pour la méthode de paiement
const MethodeP = Object.freeze({
  PaiementAnticipe: 'paiement anticipé',
  Cheque: 'chèque',
  Prelevement: 'prélèvement',
  CarteDeCredit: 'carte de crédit',
  Cash: 'cash',
  PaiementATemperament: 'paiement a temperament'
});

// Création du Schema de paiement
const PaiementSchema = new Schema({
  montant: {
    type: Number,
    required: true
  },
  dateDePaiement: {
    type: Date,
    required: true
  },
  methodeDePaiement: {
    type: String,
    enum: Object.values(MethodeP),
    required: false
  }
});

// Ajout de l'énumération au schéma
Object.assign(PaiementSchema.statics, {
  MethodeP
});

// Création du modèle de paiement
const Paiement = model('Paiement', PaiementSchema);

export default Paiement;
