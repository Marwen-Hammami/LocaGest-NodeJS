// Importer le module express
import express from 'express';

// Créer un objet router
const router = express.Router();

// Importer le controller historiquesEntretien
import historiquesEntretienController from '../controllers/historique_entretiensController.js';

// Définir les routes pour les différentes méthodes de requête
router.post('/', historiquesEntretienController.createHistoriqueEntretien); // Créer un nouvel historique d'entretien
router.get('/', historiquesEntretienController.getHistoriquesEntretien); // Récupérer tous les historiques d'entretien
router.get('/:id', historiquesEntretienController.getHistoriqueEntretienById); // Récupérer un historique d'entretien par son identifiant
router.put('/:id', historiquesEntretienController.updateHistoriqueEntretienById); // Modifier un historique d'entretien par son identifiant
router.delete('/:id', historiquesEntretienController.deleteHistoriqueEntretienById); // Supprimer un historique d'entretien par son identifiant

// Exporter le router
export default router;
