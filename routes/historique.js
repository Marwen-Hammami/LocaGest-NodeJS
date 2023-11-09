// Import express
import { Router } from 'express';

// Import the Historique controller
import { getAllHistoriques, createHistorique, updateHistorique, deleteHistorique } from '../controllers/historique.js';

// Create a new router
const router = Router();

// Define the routes for the Historique model
router.get('/', getAllHistoriques);
router.post('/', createHistorique);
router.put('/:id', updateHistorique);
router.delete('/:id', deleteHistorique);

// Export the router
export default router;
