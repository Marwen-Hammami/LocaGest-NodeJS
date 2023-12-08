import Geolocalisation from '../models/geolocalisation.js'; 

// Fonction pour créer une nouvelle entrée de géolocalisation
const createGeolocalisation = async (req, res) => {
  try {
    const { Coord_GPS, Date, Heure, Vehicule } = req.body;
    const newGeolocalisation = new Geolocalisation({
      Coord_GPS,
      Date,
      Heure,
      Vehicule,
    });

    const savedGeolocalisation = await newGeolocalisation.save();

    res.status(201).json(savedGeolocalisation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la géolocalisation' });
  }
};

// Fonction pour récupérer toutes les entrées de géolocalisation
const getAllGeolocalisations = async (req, res) => {
  try {
    const geolocalisations = await Geolocalisation.find();
    res.status(200).json(geolocalisations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des géolocalisations' });
  }
};

// Autres fonctions pour mettre à jour, supprimer ou récupérer une entrée spécifique en fonction de vos besoins.

export { createGeolocalisation, getAllGeolocalisations };
