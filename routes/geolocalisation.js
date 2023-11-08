const express = require('express');
const router = express.Router();
const geolocalisationController = require('./controllers/geolocalisationController.js'); 

// Route pour créer une nouvelle entrée de géolocalisation
router.post('/geolocalisations', geolocalisationController.createGeolocalisation);

// Route pour récupérer toutes les entrées de géolocalisation
router.get('/geolocalisations', geolocalisationController.getAllGeolocalisations);

// Autres routes pour les opérations de mise à jour, suppression, etc.

module.exports = router;
