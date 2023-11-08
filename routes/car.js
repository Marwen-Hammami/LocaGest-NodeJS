// Importer le module express
import express from 'express';
import { body } from "express-validator";

// Importer le controller car
import { addOnce, getAllCars, updateCar, deleteCar } from "../controllers/carController.js";

// Créer un objet router
const router = express.Router();


// // Définir les routes pour les différentes méthodes de requête
router
.route("/")
.get(getAllCars)
.post(
    body("Marque").isString(),    //faire le controle pour les autres champs
    addOnce
)

router
.route("/:plate")
.put(updateCar)
.delete(deleteCar)

// Exporter le router
export default router;
