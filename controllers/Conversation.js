import Conversation from "../models/Conversation.js";
import { validationResult } from "express-validator"
import Message from "../models/Message.js";

const chatBotId = "657b52068948af22d02152e1";

//Créer une conversation
export function addOne(req, res) {
    console.log('Received request for adding Conversation:', req.params, req.file);
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() })
    }else {
        var jsonaddReq
        if (req.body.isGroup) {
            jsonaddReq = {
                members: req.body.members,
                isGroup: req.body.isGroup,
                name: req.body.name,
                // image: `https://locagest.onrender.com/img/${req.file.filename}`,
                image: `http://192.168.1.16:9090/img/${req.file.filename}`,
                // image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
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
            //If conv with chatbot then create a welcome message
            if (newConv.members[1] == chatBotId) {
                const objectIdString = newConv._id.toString();
                var jsonaddReq2
                try {
                    jsonaddReq2 = {
                        conversationId: objectIdString,
                        sender: chatBotId,
                        text: "Bonjour, comment puis-je vous aider ?",
                    };
                } catch (error) {
                    console.error("Error creating jsonaddReq2:", error);
                }
                Message.create(jsonaddReq2)
                .then((newMessage) => {
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: err.message }); // Send the error message in the response
                })
                
            }
            res.status(200).json(newConv)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message }); // Send the error message in the response
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