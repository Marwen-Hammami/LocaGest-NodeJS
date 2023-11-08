// route.js
import express from 'express';
import { createTechnician, getTechnicians ,updateTechnician, deleteTechnician  } from '../controller/technicien.js';

const router = express.Router();

// Create a new technician
router.post('/', createTechnician);

// Get all technicians
router.get('/', getTechnicians);

// Update a technician by id
router.put('/:id', updateTechnician);

// Delete a technician by id
router.delete('/:id', deleteTechnician);

export default router;
