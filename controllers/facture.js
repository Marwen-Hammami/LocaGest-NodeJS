// Import the Facture model
import Facture from '../models/facture.js';

// Create a new facture
export async function createFacture(req, res) {
    const { dateFacture, totalFacture, datePaiement } = req.body;

    // Validate input data
    if (!dateFacture || !totalFacture || !datePaiement) {
        return res.status(400).json({ error: 'dateFacture, totalFacture, and datePaiement are required fields.' });
    }

    // Create a new facture instance
    const newFacture = new Facture({
        dateFacture,
        totalFacture,
        datePaiement
    });

    // Save the facture to the database
    try {
        const savedFacture = await newFacture.save();
        res.status(201).json(savedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve all factures
export async function getAllFactures(req, res) {
    try {
        const factures = await Facture.find();
        res.status(200).json(factures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a facture
export async function updateFacture(req, res) {
    const factureId = req.params.id;
    const { dateFacture, totalFacture, datePaiement } = req.body;

    try {
        const updatedFacture = await Facture.findByIdAndUpdate(factureId, {
            dateFacture,
            totalFacture,
            datePaiement
        }, { new: true }); // Return the updated facture
        res.status(200).json(updatedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a facture
export async function deleteFacture(req, res) {
    const factureId = req.params.id;

    // Find the facture by ID and delete
    try {
        const deletedFacture = await Facture.findByIdAndDelete(factureId);
        res.status(200).json(deletedFacture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
