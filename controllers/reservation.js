// Import the Reservation model
import Reservation from '../models/reservation.js';

// Create a new reservation
export async function createReservation(req, res) {
    const { IdRes, DateDebut, DateFin, Statut, Total } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!IdRes || !DateDebut || !DateFin || !Statut || !Total) {
        return res.status(400).json({ error: 'IdRes, DateDebut, DateFin, Statut, and Total are required fields.' });
    }

    // Create a new reservation instance
    const newReservation = new Reservation({
        IdRes,
        DateDebut,
        DateFin,
        Statut,
        Total
    });

    // Save the reservation to the database
    try {
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve all reservations
export async function getAllReservations(req, res) {
    try {
        const reservations = await find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a reservation
export async function updateReservation(req, res) {
    const reservationId = req.params.id;
    const { IdRes, DateDebut, DateFin, Statut, Total } = req.body;

    try {
        const updatedReservation = await findByIdAndUpdate(reservationId, {
            IdRes,
            DateDebut,
            DateFin,
            Statut,
            Total
        }, { new: true }); // Return the updated reservation
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a reservation
export async function deleteReservation(req, res) {
    const reservationId = req.params.id;

    // Find the reservation by ID and delete
    try {
        const deletedReservation = await findByIdAndDelete(reservationId);
        res.status(200).json(deletedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
