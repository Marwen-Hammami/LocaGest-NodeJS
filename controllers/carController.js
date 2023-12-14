import Car from '../models/car.js';
import { validationResult } from "express-validator"; 

// Créer une nouvelle voiture
/*export async function addOnce(req, res) {
  try {
    console.log(req.body);
    console.log(req.file);

    let newCar = await Car.create({
      immatriculation: req.body.immatriculation,
      modele: req.body.modele,
      boite: req.body.boite,
      carburant: req.body.carburant,
      marque: req.body.marque,
      image: req.file.filename
    });

    res.status(200).json({
      immatriculation: newCar.immatriculation,
      modele: newCar.modele,
      boite: newCar.boite,
      carburant: newCar.carburant,
      marque: newCar.marque,
      image: newCar.image
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}*/




export function addOnce(req, res) {

  console.log(req.body);
  console.log(req.file);
  if (!validationResult(req).isEmpty()) {
      console.log({ errors: validationResult(req).array() })
      return res.status(400).json({ errors: validationResult(req).array() });
  } else {
      Car.create({
        immatriculation: req.body.immatriculation,
        modele: req.body.modele,
        boite: req.body.boite,
        carburant: req.body.carburant,
        marque: req.body.marque,
        image: "1702314813552.jpg"
      })
          .then(() => res.status(201).json("OK"))
          .catch((err) => {
              res.status(500).json({ error: err.message });
          });
  }

}

  // }

  // Obtenir la liste de toutes les voitures
  export function getAllCars(req, res) {
    Car.find({})
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  // export function updateCar(req, res) {
  //   // Récupérer l'immatriculation et les données de la requête
  //   const { immatriculation } = req.params;
  //   const { marque, modele, type, carburant, boite, cylindree, disponibility, etatVoiture, prixParJour, image } = req.body;
  
  //   Car.findOneAndUpdate(
  //     { immatriculation: immatriculation },
  //     { marque, modele, type, carburant, boite, cylindree, disponibility, etatVoiture, prixParJour, image },
  //     { new: true }
  //   )
  //     .then((doc1) => {
  //       if (doc1) {
  //         console.log("Voiture mise à jour avec succès :", doc1);
  //         res.status(200).json(doc1);
  //       } else {
  //         console.log("Voiture non trouvée.");
  //         res.status(404).json({ error: "Voiture non trouvée" });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Erreur lors de la mise à jour de la voiture :", err);
  //       res.status(500).json({ error: err });
  //     });
  // }

  export async function updateCar(req, res) {
    try {
      const immatriculationToUpdate = req.params.immatriculation; // Extract immatriculation from request parameters
  
      let newCarData = req.file
        ? {
            immatriculation: immatriculationToUpdate,
            modele: req.body.modele,
            boite: req.body.boite,
            carburant: req.body.carburant,
            marque: req.body.marque,
            cylindree: req.body.cylindree,
            image: req.file.filename
          }
        : {
            immatriculation: immatriculationToUpdate,
            modele: req.body.modele,
            boite: req.body.boite,
            carburant: req.body.carburant,
            marque: req.body.marque,
            cylindree: req.body.cylindree,
          };
  
      let updatedCar = await Car.findOneAndUpdate(
        { immatriculation: immatriculationToUpdate }, // Update based on immatriculation
        newCarData,
        { new: true }
      );
  
      if (updatedCar) {
        console.log("Car updated successfully:", updatedCar);
        res.status(200).json(updatedCar);
      } else {
        console.log("Car not found.");
        res.status(404).json({ error: "Car not found" });
      }
    } catch (err) {
      console.error("Error during car update:", err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }
  
  
  
  
  
  export function deleteCar(req, res) {
    // Récupérer l'immatriculation de la requête
    const { immatriculation } = req.params;

    Car.findOneAndDelete({ "immatriculation": immatriculation })
        .then(doc => {
            if (doc) {
                console.log("Voiture supprimée avec succès :", doc);
                res.status(200).json(doc);
            } else {
                console.log("Voiture non trouvée.");
                res.status(404).json({ message: "Voiture non trouvée" });
            }
        })
        .catch(err => {
            console.error("Erreur lors de la suppression de la voiture :", err);
            res.status(500).json({ error: err });
        });
}

  
  // Supprimer une voiture par sa plaque
  //    const deleteCar = async (req, res) => {
  //   try {
  //     // Récupérer la plaque de la requête
  //     const { plate } = req.params;
  
  //     // Trouver et supprimer la voiture correspondante dans la base de données
  //     const deletedCar = await Car.findOneAndDelete({ Immatriculation: plate });
  
  //     // Vérifier si la voiture existe
  //     if (!deletedCar) {
  //       return res.status(404).json({ error: 'Voiture introuvable' });
  //     }
  
  //     // Envoyer une réponse avec la voiture supprimée
  //     res.status(204).send();
  //   } catch (error) {
  //     res.status(500).json({ error: 'Erreur lors de la suppression de la voiture' });
  //   }
  // };
  // export { createCar, updateCar, deleteCar };