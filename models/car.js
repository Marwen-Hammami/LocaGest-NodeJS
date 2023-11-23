import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carSchema = new Schema({
  immatriculation: String,
  marque: String,
  modele: String,
  type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Truck','Sportive', 'autre'],
    default:'autre'
  },
  carburant: {
    type: String,
    enum: ['Essence', 'Diesel', 'Electrique', 'Hybride', 'autre'],
  },
  boite: {
    type: String,
    enum: ['Manuelle', 'Automatique'],
  },
  cylindée:{
    type: String,
    default:'autre'
  } ,
  disponibility: {
    type: String,
    enum: ['Disponible', 'Louée', 'Maintenance', 'autre'],
  },
  etatVoiture: {
    type: String,
    default:'autre'
  },
  prixParJour:{
    type: Number,
    default:5
  },
});

const Car = model('Car', carSchema);

export default Car;


      
      
      
      
      
      
      
      
      
      