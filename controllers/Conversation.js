import Conversation from "../models/Conversation.js";
import { validationResult } from "express-validator"

//Créer une conversation
export function addOne(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() })
    }else {
        var jsonaddReq
        if (req.body.isGroup) {
            jsonaddReq = {
                members: req.body.members,
                isGroup: req.body.isGroup,
                name: req.body.name,
                image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
            }
        }else{
            jsonaddReq = {
                members: req.body.members,
                isGroup: req.body.isGroup,
            }
        }

        Conversation
        .create(jsonaddReq)
        .then(newConv => {
            res.status(200).json(newConv)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }
}

//Récupérer les conversation d'un utilisateur
export function getAllWithIdUser(req, res) {
    Conversation
    .find({
        members: { $in: [req.params.id] },
    })
    .then(convs => {
        res.status(200).json(convs)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
  }

  //Modifier une conversation
  export function patchOne(req, res) {
    var jsonupdateReq
        if (req.file) {
            jsonupdateReq = {
                members: req.body.members,
                isGroup: req.body.isGroup,
                name: req.body.name,
                image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
            }
        }else{
            jsonupdateReq = {
                members: req.body.members,
                isGroup: req.body.isGroup,
                name: req.body.name,
                image: req.body.image,
            }
        }
        Conversation
        .findOneAndUpdate({
            _id: req.params.id
        }, 
        jsonupdateReq, 
        {new: true})
        .then(updatedConv => {
            res.status(200).json(updatedConv)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
}