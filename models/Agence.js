// Importer le module express
import express from 'express';
import { body } from "express-validator";

// Importer le controller car
import { addOne, getAllAgences, updateAgence, deleteAgence } from "../controllers/Agence.js";

// Créer un objet router
const router = express.Router();


// // Définir les routes pour les différentes méthodes de requête
router
.route("/")
.get(getAllAgences)

router
.route("/new")
.post(
    addOne
)
router
.route("/:id")
.put(updateAgence)
.delete(deleteAgence)

// Exporter le router
export default router;