// Import the Reservation model
import Reservation from '../models/reservation.js';

// Create a new reservation
export async function createReservation(req, res) {
    const { DateDebut, DateFin,HeureDebut, HeureFin,Statut, Total } = req.body;

    // Validate input data (e.g., check if required fields are present)
    if (!DateDebut || !DateFin || !HeureDebut || !HeureFin ) {
        return res.status(400).json({ error: 'DateDebut, DateFin, HeureDebut and HeureFin are required fields.' });
    }

    // Create a new reservation instance
    const newReservation = new Reservation({
        DateDebut,
        DateFin,
        HeureDebut,
        HeureFin,
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
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a reservation
export async function updateReservation(req, res) {
    const reservationId = req.params.id;
    const { DateDebut, DateFin ,HeureDebut,HeureFin, Statut, Total } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, {
            DateDebut,
            DateFin,
            HeureDebut,
            HeureFin,
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
        const deletedReservation = await Reservation.findByIdAndDelete(reservationId); // Assuming 'Reservation' is your Mongoose model
        res.status(200).json(deletedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

// Update a reservation status to 'Payée'
export async function markReservationAsPaid(req, res) {
    const reservationId = req.params.id;

    try {
        // Find the reservation by ID
        const reservation = await Reservation.findById(reservationId);

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Check if the current status is 'Reservée'
        if (reservation.Statut !== Reservation.StatutRes.Reservee) {
            return res.status(400).json({ error: 'Reservation must be in status "Reservée" to be marked as "Payée".' });
        }

        // Update the reservation status to 'Payée'
        reservation.Statut = Reservation.StatutRes.Payee;

        // Save the updated reservation to the database
        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}