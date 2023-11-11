// Importer le modèle HistoriqueEntretien
import HistoriqueEntretien from '../models/historique_entretiens.js';

// Créer un contrôleur pour gérer les requêtes liées aux historiques d'entretien
const historiquesEntretienController = {};

// Créer une méthode pour ajouter un nouvel historique d'entretien à la base de données
historiquesEntretienController.createHistoriqueEntretien = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { ObjectId, Date_entretien, Description, Cout_reparation, Vehicule_Type } = req.body;

    // Créer un nouvel objet HistoriqueEntretien
    const newHistoriqueEntretien = new HistoriqueEntretien({
      ObjectId,
      Date_entretien,
      Description,
      Cout_reparation,
      Vehicule_Type,
    });

    // Sauvegarder l'objet dans la base de données
    await newHistoriqueEntretien.save();

    // Envoyer une réponse avec le statut 201 (Created) et l'objet créé
    res.status(201).json(newHistoriqueEntretien);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour récupérer tous les historiques d'entretien de la base de données
historiquesEntretienController.getHistoriquesEntretien = async (req, res) => {
  try {
    // Trouver tous les historiques d'entretien dans la base de données
    const historiquesEntretien = await HistoriqueEntretien.find();

    // Envoyer une réponse avec le statut 200 (OK) et le tableau des historiques d'entretien
    res.status(200).json(historiquesEntretien);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour récupérer un historique d'entretien par son identifiant
historiquesEntretienController.getHistoriqueEntretienById = async (req, res) => {
  try {
    // Récupérer l'identifiant de la requête
    const { id } = req.params;

    // Trouver l'historique d'entretien correspondant dans la base de données
    const historiqueEntretien = await HistoriqueEntretien.findById(id);

    // Si l'historique d'entretien n'existe pas, envoyer une réponse avec le statut 404 (Not Found) et un message d'erreur
    if (!historiqueEntretien) {
      return res.status(404).json({ message: 'Historique d\'entretien introuvable' });
    }

    // Sinon, envoyer une réponse avec le statut 200 (OK) et l'historique d'entretien trouvé
    res.status(200).json(historiqueEntretien);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour modifier un historique d'entretien par son identifiant
historiquesEntretienController.updateHistoriqueEntretienById = async (req, res) => {
  try {
    // Récupérer l'identifiant et les données de la requête
    const { id } = req.params;
    const { Date_entretien, Description, Cout_reparation, Vehicule_Type } = req.body;

    // Créer un objet avec les données à modifier
    const updateData = {
      Date_entretien,
      Description,
      Cout_reparation,
      Vehicule_Type,
    };

    // Modifier l'historique d'entretien correspondant dans la base de données
    const updatedHistoriqueEntretien = await HistoriqueEntretien.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // Envoyer une réponse avec le statut 200 (OK) et l'historique d'entretien modifié
    res.status(200).json(updatedHistoriqueEntretien);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour supprimer un historique d'entretien par son identifiant
historiquesEntretienController.deleteHistoriqueEntretienById = async (req, res) => {
  try {
    // Récupérer l'identifiant de la requête
    const { id } = req.params;

    // Supprimer l'historique d'entretien correspondant dans la base de données
    await HistoriqueEntretien.findByIdAndDelete(id);

    // Envoyer une réponse avec le statut 200 (OK) et un message de confirmation
    res.status(200).json({ message: 'Historique d\'entretien supprimé avec succès' });
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Exporter le contrôleur
export default historiquesEntretienController;
