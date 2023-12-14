import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carSchema = new Schema({
  immatriculation:  {
    type : String,
    required: true
  },
  marque:  {
    type : String,
    required: true
  },
  modele:  {
    type : String,
    required: true
  },
  type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Truck','Sportive', 'autre'],
    default:'autre'
  },
  carburant: {
    type: String,
    enum: ['Essence', 'Diesel', 'Electrique', 'Hybride', 'autre'],
    default:'Essence'
  },
  boite: {
    type: String,
    enum: ['Manuelle', 'Automatique'],
    default:'Manuelle'
  },
  cylindree:{
    type: String,
    default:'Manuelle'
    
  } ,
  disponibility: {
    type: String,
    enum: ['Disponible', 'Louée', 'Maintenance', 'autre'],
    default:'Disponible'
  },
  etatVoiture: {
    type: String,
    default:'Essence'
  },
  prixParJour:{
    type: Number,
    default:5
  },
  image : {
    type : String,
    required: false
  }
});

const Car = model('Car', carSchema);

export default Car;


      
      
      
      
      
      
      
      
      
      