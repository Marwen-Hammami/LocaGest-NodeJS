// Import the Contrat model
import Contrat from '../models/contrat.js';

// Create a new contrat
export async function createContrat(req, res) {
    const { dateCreation, Signature, dateDepart, dateRetour, kmDepart, kmRetour, montantAcompte, agenceRetour } = req.body;

    // Validate input data
    if (!dateCreation || !Signature || !dateDepart || !dateRetour || !kmDepart || !kmRetour || !montantAcompte || !agenceRetour) {
        return res.status(400).json({ error: 'dateCreation, Signature, dateDepart, dateRetour, kmDepart, kmRetour, montantAcompte, and agenceRetour are required fields.' });
    }

    // Create a new contrat instance
    const newContrat = new Contrat({
        dateCreation,
        Signature,
        dateDepart,
        dateRetour,
        kmDepart,
        kmRetour,
        montantAcompte,
        agenceRetour
    });

    // Save the contrat to the database
    try {
        const savedContrat = await newContrat.save();
        res.status(201).json(savedContrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Retrieve all contrats
export async function getAllContrats(req, res) {
    try {
        const contrats = await Contrat.find();
        res.status(200).json(contrats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a contrat
export async function updateContrat(req, res) {
    const contratId = req.params.id;
    const { dateCreation, Signature, dateDepart, dateRetour, kmDepart, kmRetour, montantAcompte, agenceRetour } = req.body;

    try {
        const updatedContrat = await Contrat.findByIdAndUpdate(contratId, {
            dateCreation,
            Signature,
            dateDepart,
            dateRetour,
            kmDepart,
            kmRetour,
            montantAcompte,
            agenceRetour
        }, { new: true }); // Return the updated contrat
        res.status(200).json(updatedContrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a contrat
export async function deleteContrat(req, res) {
    const contratId = req.params.id;

    // Find the contrat by ID and delete
    try {
        const deletedContrat = await Contrat.findByIdAndDelete(contratId);
        res.status(200).json(deletedContrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
