import Car from '../models/car.js'; 

// Créer une nouvelle voiture
  export function addOnce(req, res) {
    // console.log(req.body)
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
    // Récupérer la plaque et les données de la requête
    const { plate } = req.params;
    const { brand, model, type, fuel, gearbox, cylindree, disponibility, etatVoiture, prixParJour } = req.body;

    Car.findByIdAndUpdate(
      { _id: plate },
      req.body,
        { new: true }
      )
      .then((doc1) => {
      res.status(500).json(doc1);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function deleteCar(req, res) {
    Car
    .findOneAndRemove({ "_id" : req.params.plate})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
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