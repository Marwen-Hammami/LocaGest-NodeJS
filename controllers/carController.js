import Car from '../models/car.js'; 

// Créer une nouvelle voiture
  export function addOnce(req, res) {
     console.log(req.body)
    // if (!validationResult(req).isEmpty()) {
    //   res.status(400).json({ errors: validationResult(req).array() });
    // } else {
      //const { plate, brand, model, type, fuel, gearbox, cylindree, disponibility, etatVoiture, prixParJour } = req.body;
            // // Ajouter une expression régulière pour valider la plaque
            // const plateRegex = /^[0-9]{4} TU [0-9]{3}$/;
            // if (!plate || !plateRegex.test(plate)) {
            //   return res.status(400).json({ error: 'Plaque invalide' });
            // }
            // const existingCar = await Car.findOne({ Immatriculation: plate });
            // if (existingCar) {
            //   return res.status(409).json({ error: 'Voiture déjà existante' });
            // }
            // const plateInfo = await getPlateInfo(plate);
      Car.create(req.body)
        .then((newGame) => {
          res.status(200).json(newGame);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
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

  export function updateCar(req, res) {
    // Récupérer l'immatriculation et les données de la requête
    const { immatriculation } = req.params;
    const { marque, modele, type, carburant, boite, cylindree, disponibility, etatVoiture, prixParJour } = req.body;
  
    Car.findOneAndUpdate(
      { immatriculation: immatriculation },
      { marque, modele, type, carburant, boite, cylindree, disponibility, etatVoiture, prixParJour },
      { new: true }
    )
      .then((doc1) => {
        if (doc1) {
          console.log("Voiture mise à jour avec succès :", doc1);
          res.status(200).json(doc1);
        } else {
          console.log("Voiture non trouvée.");
          res.status(404).json({ error: "Voiture non trouvée" });
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour de la voiture :", err);
        res.status(500).json({ error: err });
      });
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