// Importer express
import { Router } from 'express';

// Importer le contrôleur Paiement
import { getAllPaiements, createPaiement, updatePaiement, deletePaiement } from '../controllers/paiement.js';

// Créer un nouveau routeur
const router = Router();

// Définir les routes pour le modèle Paiement
router.get('/', getAllPaiements);
router.post('/', createPaiement);
router.put('/:id', updatePaiement);
router.delete('/:id', deletePaiement);

// Exporter le routeur
export default router;
