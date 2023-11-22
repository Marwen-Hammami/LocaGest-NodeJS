// Import express
import { Router } from 'express';

// Import the Contrat controller
import { getAllContrats, createContrat, updateContrat, deleteContrat } from '../controllers/contrat.js';

// Create a new router
const router = Router();

// Define the routes for the Contrat model
router.get('/', getAllContrats);
router.post('/', createContrat);
router.put('/:id', updateContrat);
router.delete('/:id', deleteContrat);

// Export the router
export default router;
