// Import express
import { Router } from 'express';

// Import the Reservation controller
import { getAllReservations, createReservation, updateReservation, deleteReservation } from '../controllers/reservation.js';

// Create a new router
const router = Router();



// Define the routes for the Reservation model
router.get('/', getAllReservations);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);



// Export the router
export default router;
