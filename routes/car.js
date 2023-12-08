// Importer le module express
import express from 'express';
import { body } from "express-validator";

// Importer le controller car
import { addOnce, getAllCars, updateCar, deleteCar } from "../controllers/carController.js";
import multerConfig from '../middlewares/multer-config.js';
// Créer un objet router
const router = express.Router();

const upload = multerConfig('image', {fileSize: 5 * 1024 * 1024});
// // Définir les routes pour les différentes méthodes de requête
router
.route("/")
.get(getAllCars)
.post(
    body("Marque").isString(),  
    upload,  //faire le controle pour les autres champs
    addOnce
)

router
.route("/:immatriculation")
.put(updateCar)
.delete(deleteCar)

// Exporter le router
export default router;
