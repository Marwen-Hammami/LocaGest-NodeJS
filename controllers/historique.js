// Import the Historique model
import Historique from '../models/historique.js';

// Create a new historique
export async function createHistorique(req, res) {
    const { IdRes, DateDebut, DateFin, Statut, Total } = req.body;

    // Validate input data
    if (!IdRes || !DateDebut || !DateFin || !Total) {
        return res.status(400).json({ error: 'IdRes, DateDebut, DateFin and Total are required fields.' });
    }

    // Create a new historique instance
    const newHistorique = new Historique({
        IdRes,
        DateDebut,
        DateFin,
        Statut,
        Total
    });

    // Save the historique to the database
    try {
        const savedHistorique = await newHistorique.save();
        res.status(201).json(savedHistorique);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve all historiques
export async function getAllHistoriques(req, res) {
    try {
        const historiques = await Historique.find();
        res.status(200).json(historiques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a historique
export async function updateHistorique(req, res) {
    const historiqueId = req.params.id;
    const { IdRes, DateDebut, DateFin, Statut, Total } = req.body;

    try {
        const updatedHistorique = await Historique.findByIdAndUpdate(historiqueId, {
            IdRes,
            DateDebut,
            DateFin,
            Statut,
            Total
        }, { new: true }); // Return the updated historique
        res.status(200).json(updatedHistorique);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a historique
export async function deleteHistorique(req, res) {
    const historiqueId = req.params.id;

    // Find the historique by ID and delete
    try {
        const deletedHistorique = await Historique.findByIdAndDelete(historiqueId);
        res.status(200).json(deletedHistorique);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}