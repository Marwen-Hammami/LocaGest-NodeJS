import Message from '../models/Message.js'
import { validationResult } from "express-validator"

//Créer un message
export function addOne(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() })
    }else {
        Conversation
        .create(req.body)
        .then(newMessage => {
            res.status(200).json(newMessage)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }
}
//Récupérer les messages d'une conversation
export function getAllWithIdConv(req, res) {
    Message
    .find({
        conversationId: req.params.id,
    }).then(messages => {
        res.status(200).json(messages)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
    
  };
//Supprimer un message
export function deleteOne(req, res) {
    Message
    .findOneAndRemove({ "ObjectId" : req.params.id})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}