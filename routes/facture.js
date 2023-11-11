// Import express
import { Router } from 'express';

// Import the Facture controller
import { getAllFactures, createFacture, updateFacture, deleteFacture } from '../controllers/facture.js';

// Create a new router
const router = Router();

// Define the routes for the Facture model
router.get('/', getAllFactures);
router.post('/', createFacture);
router.put('/:id', updateFacture);
router.delete('/:id', deleteFacture);

// Export the router
export default router;
