import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carSchema = new Schema({
  Immatriculation: String,
  Marque: String,
  Modele: String,
  Type: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Convertible', 'Truck','Sportive', 'autre'],
  },
  Fuel: {
    type: String,
    enum: ['Gasoline', 'Diesel', 'Electrique', 'Hybride', 'autre'],
  },
  Gearbox: {
    type: String,
    enum: ['Manuelle', 'Automatique'],
  },
  Cylindée: String,
  Disponibility: {
    type: String,
    enum: ['Disponible', 'Louée', 'Maintenance', 'autre'],
  },
  EtatVoiture: String,
  PrixParJour: Number,
});

const Car = model('Car', carSchema);

export default Car;


      
      
      
      
      
      
      
      
      
      