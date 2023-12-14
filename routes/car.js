// Importer le module express
import express from 'express';
import { body } from "express-validator";

// Importer le controller car
import { addOnce, getAllCars, updateCar, deleteCar } from "../controllers/carController.js";
import multerConfig from '../middlewares/multer-config.js';
// Créer un objet router
const router = express.Router();


// // Définir les routes pour les différentes méthodes de requête
router
    .route('/')
    .post(multerConfig,
        [body("marque").isString()],  
        addOnce)
    .get(getAllCars);

router
.route("/:immatriculation")
.put(multerConfig,updateCar)
.delete(deleteCar)

// Exporter le router
export default router;