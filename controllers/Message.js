import Message from '../models/Message.js'
import { validationResult } from "express-validator"

import OpenAI from "openai";

const openai = new OpenAI();

//Créer un message
export function addOne(req, res) {
    console.log(req.body)
    console.log(req.file)

    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() })
    }else {
        var convIdString = req.body.conversationId
        var senderIdString = req.body.sender
        var textString = req.body.text
        const substring = '"';

        const regex = new RegExp(substring);
        if (regex.test(convIdString)) {
            convIdString = convIdString.slice(0, -1);
            convIdString = convIdString.substring(1);

            senderIdString = senderIdString.slice(0, -1);
            senderIdString = senderIdString.substring(1);

            textString = textString.slice(0, -1);
            textString = textString.substring(1);
        } 
        var jsonaddReq
        if (req.files) {
            var fileUrls = []
            for(const file of req.files) {
                // fileUrls.push(`${req.protocol}://${req.get('host')}/img/${file.filename}`)
                // fileUrls.push(`https://locagest.onrender.com/img/${file.filename}`)
                fileUrls.push(`http://192.168.1.16:9090/img/${file.filename}`)
            }
            jsonaddReq = {
                conversationId: convIdString,
                sender: senderIdString,
                text: textString,
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

    //le chatbot de openai  
    export async function sendMessageToChatBot(req, res) {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
          });
        
          console.log(completion.choices[0]);
    }