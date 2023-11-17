import Message from '../models/Message.js'
import { validationResult } from "express-validator"

//Créer un message
export function addOne(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() })
    }else {
        var convIdString = req.body.conversationId
        var senderIdString = req.body.sender
        const substring = '"';

        const regex = new RegExp(substring);
        if (regex.test(convIdString)) {
            console.log("The string contains the substring.")
            convIdString = convIdString.slice(0, -1);
            convIdString = convIdString.substring(1);
            console.log(convIdString)
        } 
        if (regex.test(senderIdString)) {
            senderIdString = senderIdString.slice(0, -1);
            senderIdString = senderIdString.substring(1);
            console.log("The string contains the substring.")
            console.log(senderIdString)
        } 
        var jsonaddReq
        if (req.files) {
            var fileUrls = []
            for(const file of req.files) {
                fileUrls.push(`${req.protocol}://${req.get('host')}/img/${file.filename}`)
            }
            jsonaddReq = {
                conversationId: convIdString,//req.body.conversationId,
                sender: senderIdString, //req.body.sender,
                text: req.body.text,
                file: fileUrls,
            }
        }else{
            jsonaddReq = {
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                text: req.body.text,
            }
        }
        Message
        .create(jsonaddReq)
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
    .findOneAndRemove({ "_id" : req.params.id})
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}