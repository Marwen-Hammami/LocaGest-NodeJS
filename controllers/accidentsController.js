// Importer le modèle Accident
import Accident from '../models/accidents.js';

// Créer un contrôleur pour gérer les requêtes liées aux accidents
const accidentsController = {};

// Créer une méthode pour ajouter un nouvel accident à la base de données
accidentsController.createAccident = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { ObjectId, Date_accident, Description, Cout_reparation, Vehicule } = req.body;

    // Créer un nouvel objet Accident
    const newAccident = new Accident({
      ObjectId,
      Date_accident,
      Description,
      Cout_reparation,
      Vehicule,
    });

    // Sauvegarder l'objet dans la base de données
    await newAccident.save();

    // Envoyer une réponse avec le statut 201 (Created) et l'objet créé
    res.status(201).json(newAccident);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour récupérer tous les accidents de la base de données
accidentsController.getAccidents = async (req, res) => {
  try {
    // Trouver tous les accidents dans la base de données
    const accidents = await Accident.find();

    // Envoyer une réponse avec le statut 200 (OK) et le tableau des accidents
    res.status(200).json(accidents);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour récupérer un accident par son identifiant
accidentsController.getAccidentById = async (req, res) => {
  try {
    // Récupérer l'identifiant de la requête
    const { id } = req.params;

    // Trouver l'accident correspondant dans la base de données
    const accident = await Accident.findById(id);

    // Si l'accident n'existe pas, envoyer une réponse avec le statut 404 (Not Found) et un message d'erreur
    if (!accident) {
      return res.status(404).json({ message: 'Accident not found' });
    }

    // Sinon, envoyer une réponse avec le statut 200 (OK) et l'accident trouvé
    res.status(200).json(accident);
  } catch (error) {
    // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Créer une méthode pour modifier un accident par son identifiant
accidentsController.updateAccidentById = async (req, res) => {
  try {
    // Récupérer l'identifiant et les données de la requête
    const { id } = req.params;
    const { Date_accident, Description, Cout_reparation, Vehicule } = req
        // Créer un objet avec les données à modifier
        const updateData = {
            Date_accident,
            Description,
            Cout_reparation,
            Vehicule,
          };
      
          // Modifier l'accident correspondant dans la base de données
          const updatedAccident = await Accident.findByIdAndUpdate(id, updateData, {
            new: true,
          });
      
          // Envoyer une réponse avec le statut 200 (OK) et l'accident modifié
          res.status(200).json(updatedAccident);
        } catch (error) {
          // En cas d'erreur, envoyer une réponse avec le statut 500 (Internal Server Error) et le message d'erreur
          res.status(500).json({ message: error.message });
        }
      };
      