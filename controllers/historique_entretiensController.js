import HistoriqueEntretien from '../models/historique_entretiens.js';
import { validationResult } from "express-validator"; 


// Créer un nouvel entretien
export async function addOnce(req, res) {
  try {
    let newEntretien = await HistoriqueEntretien.create({
      immatriculation: req.body.immatriculation,
      date_entretien: req.body.date_entretien,
      description: req.body.description,
      cout_reparation: req.body.cout_reparation,
      titre: req.body.titre,
      cartype: req.body.cartype,
      image: req.file.filename
    });

    res.status(200).json({
      immatriculation: newEntretien.immatriculation,
      cartype: newEntretien.cartype,
      date_entretien: newEntretien.date_entretien,
      description: newEntretien.description,
      cout_reparation: newEntretien.cout_reparation,
      titre: newEntretien.titre,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

// Obtenir la liste de tous les entretiens
export function getAllEntretiens(req, res) {
  HistoriqueEntretien.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour un entretien
export async function updateEntretien(req, res) {
  try {
    const immatriculationToUpdate = req.params.immatriculation; // Extract immatriculation from request parameters

    let newEntretienData = req.file
      ? {
          immatriculation: immatriculationToUpdate,
          date_entretien: req.body.date_entretien,
          cartype: req.body.cartype,
          description: req.body.description,
          cout_reparation: req.body.cout_reparation,
          titre: req.body.titre,
          image: req.file.filename
        }
      : {
          immatriculation: immatriculationToUpdate,
          date_entretien: req.body.date_entretien,
          cartype: req.body.cartype,
          description: req.body.description,
          cout_reparation: req.body.cout_reparation,
          titre: req.body.titre,
        };

    let updatedEntretien = await HistoriqueEntretien.findOneAndUpdate(
      { immatriculation: immatriculationToUpdate }, // Update based on immatriculation
      newEntretienData,
      { new: true }
    );

    if (updatedEntretien) {
      console.log("Entretien updated successfully:", updatedEntretien);
      res.status(200).json(updatedEntretien);
    } else {
      console.log("Entretien not found.");
      res.status(404).json({ error: "Entretien not found" });
    }
  } catch (err) {
    console.error("Error during Entretien update:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}




// Supprimer un entretien
export function deleteEntretien(req, res) {
  const { immatriculation } = req.params;

  HistoriqueEntretien.findOneAndDelete({ "immatriculation": immatriculation })
    .then(doc => {
      if (doc) {
        console.log("Entretien supprimé avec succès :", doc);
        res.status(200).json(doc);
      } else {
        console.log("Entretien non trouvé.");
        res.status(404).json({ message: "Entretien non trouvé" });
      }
    })
    .catch(err => {
      console.error("Erreur lors de la suppression de l'entretien :", err);
      res.status(500).json({ error: err });
    });
}