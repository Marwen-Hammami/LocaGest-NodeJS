// Importer le modèle Paiement
import Paiement from '../models/paiement.js';

// Créer un nouveau paiement
export async function createPaiement(req, res) {
    const { montant, dateDePaiement, methodeDePaiement } = req.body;

    // Valider les données d'entrée (par exemple, vérifier si les champs requis sont présents)
    if (!montant || !dateDePaiement || !methodeDePaiement) {
        return res.status(400).json({ error: 'Montant, dateDePaiement, et methodeDePaiement sont des champs obligatoires.' });
    }

    // Créer une nouvelle instance de paiement
    const newPaiement = new Paiement({
        montant,
        dateDePaiement,
        methodeDePaiement
    });

    // Enregistrer le paiement dans la base de données
    try {
        const savedPaiement = await newPaiement.save();
        res.status(201).json(savedPaiement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Récupérer tous les paiements
export async function getAllPaiements(req, res) {
    try {
        const paiements = await Paiement.find();
        res.status(200).json(paiements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Mettre à jour un paiement
export async function updatePaiement(req, res) {
    const paiementId = req.params.id;
    const { montant, dateDePaiement, methodeDePaiement } = req.body;

    try {
        const updatedPaiement = await Paiement.findByIdAndUpdate(paiementId, {
            montant,
            dateDePaiement,
            methodeDePaiement
        }, { new: true }); // Retourner le paiement mis à jour
        res.status(200).json(updatedPaiement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Supprimer un paiement
export async function deletePaiement(req, res) {
    const paiementId = req.params.id;

    // Trouver le paiement par ID et supprimer
    try {
        const deletedPaiement = await Paiement.findByIdAndDelete(paiementId);
        res.status(200).json(deletedPaiement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
