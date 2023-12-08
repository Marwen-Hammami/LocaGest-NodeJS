import Agence from '../models/Agence.js';

// Créer une nouvelle Agence
  export function addOne(req, res) {
    console.log(req.body)
    Agence.create(req.body)
        .then((newAgence) => {
          res.status(200).json(newAgence);
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ error: err });
        });
    }

  // Obtenir la liste de toutes les Agences
  export function getAllAgences(req, res) {
    Agence.find({})
      .then((agences) => {
        res.status(200).json(agences);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function updateAgence(req, res) {
    // Récupérer la plaque et les données de la requête
    const { id } = req.params;
    
    Agence.findByIdAndUpdate(
      { _id: id },
      req.body,
        { new: true }
      )
      .then((agence) => {
      res.status(200).json(agence);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function deleteAgence(req, res) {
    Agence
    .findOneAndRemove({ "_id" : req.params.id})
    .then(agence => {
        res.status(200).json(agence)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
  }