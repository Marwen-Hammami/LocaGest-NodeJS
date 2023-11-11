// Importer le module express
import express from 'express';

// Créer un objet router
const router = express.Router();

// Importer le controller accidents
// import accidentsController from '../controllers/accidentsController.js';

// // Définir les routes pour les différentes méthodes de requête
// router.post('/', accidentsController.createAccident); // Créer un nouvel accident
// router.get('/', accidentsController.getAccidents); // Récupérer tous les accidents
// router.get('/:id', accidentsController.getAccidentById); // Récupérer un accident par son identifiant
// router.put('/:id', accidentsController.updateAccidentById); // Modifier un accident par son identifiant
// router.delete('/:id', accidentsController.deleteAccidentById); // Supprimer un accident par son identifiant

// Exporter le router
export default router;
