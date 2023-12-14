// Importer le module express
import express from 'express';
import { body } from "express-validator";

// Importer le controller historiquesEntretien
import {
  addOnce,
  getAllEntretiens,
  updateEntretien,
  deleteEntretien
} from "../controllers/historique_entretiensController.js";

import multerConfig from '../middlewares/multer-config.js';

// Créer un objet router
const router = express.Router();

// Définir les routes pour les différentes méthodes de requête
router
  .route("/")
  .get(getAllEntretiens)
  .post(
    multerConfig, // Utilisez multerConfig en tant que middleware pour gérer les fichiers
    [
      body("immatriculation").isString(),
      body("cartype").isString(),
      body("titre").isString(),
      body("date_entretien").isISO8601(),
      body("description").isString(),
      body("cout_reparation").isNumeric(),
    ],
    addOnce
  );

router
  .route("/:immatriculation")
  .put(multerConfig, updateEntretien)
  .delete(deleteEntretien);

// Exporter le router
export default router;
