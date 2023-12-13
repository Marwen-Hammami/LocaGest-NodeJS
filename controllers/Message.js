import Message from '../models/Message.js'
import Signalement from '../models/Signalement.js';
import { validationResult } from "express-validator"

// Debut OpenAI API Config **************************************
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const apiKey = process.env.OPEN_AI_KEY; // Ensure the variable name matches your .env file

if (!apiKey) {
  throw new Error('API key not found or empty. Set OPEN_AI_KEY in your .env file.');
}

const openai = new OpenAI({ apiKey: apiKey });

// Fin OpenAI API Config ****************************************

//Créer un message
export function addOne(req, res) {  //get bad words list and iterate
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
    .findById(req.params.id)
    .then(message => {
        message.Supprime = true
        message.save()
        res.status(200).json(message)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

//Methode archiver le message
export function archiveOne(req, res) {
    Message
    .findById(req.params.id)
    .then(message => {
        message.Archive = !message.Archive
        message.save()
        res.status(200).json(message)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

//Signaler un message
export async function SignalerMessage(req, res) {
    //get the message text from the id
    Message.findById(req.body.messageId)
    .then(async message => {

        //request the ai do treat the signalement
        const moderation = await openai.moderations.create({ input: message.text });

        console.log("moderation.results[0].flagged : "+ moderation.results[0].flagged);

        if(moderation.results[0].flagged == true){
            //Archiver le message (visible seulement grace au liens au signalement)
            message.Archive = true
            message.save()
            //Traiter le signalement en cas de positif
            var sign = Signalement(req.body)
            sign.traite = true
            sign.traiteAutomatiquement = true
            sign.signalementPertinant = true

            Signalement
            .create(sign)
            .then(newSignalement => {
                res.status(200).send("Le message signalé a été supprimé.")
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        } else if (moderation.results[0].flagged == false){
            //Traiter le signalement en cas de negatif
            var sign = Signalement(req.body)
            sign.traite = true
            sign.traiteAutomatiquement = true
            sign.signalementPertinant = false

            Signalement
            .create(sign)
            .then(newSignalement => {
                res.status(201).send("Le signalement as bien été pris en compte, mais le message ne seras pas supprimé car il n'enfrein pas notre politique d'utilisation.")
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        } else {
            //en cas d'absence de la variable moderation.results[0].flagged, traitement futur pour l'administrateur
            Signalement
            .create(req.body)
            .then(newSignalement => {
                res.status(201).send("Le signalement as bien été pris en compte, et sera traité sous les plus brefs délais")
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

//Modifier Signalement d'message
export function ModifierSignalement(req, res) {
    Signalement
        .findById(req.body._id)
        .then(signalement => {
            signalement.traite = req.body.traite
            signalement.traiteAutomatiquement = req.body.traiteAutomatiquement
            signalement.save()
            res.status(200).json(signalement)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
}
//Liste des Signalements
export function ListSignalements(req, res) {
    Signalement
    .find()
    .then(listSignalements => {
        res.status(200).json(listSignalements)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

    //le chatbot de openai  
    export async function sendMessageToChatBot(req, res) {
        try {
            //get chat history of conv
            const { userMessage, idConv } = req.body;

            //get user reservations
            //make it possible to rent a car
            const systemMessage = 'You are CarRentalBot, a knowledgeable assistant from LocaGest Car Rentals. Provide helpful information and assistance to our customers. Respond in the language of the user.';
        
            // Construct messages array with system role and user role
            const messages = [
              { role: 'system', content: systemMessage },
              { role: 'user', content: userMessage },
            ];
        
            // Add historical messages to the chat
            if (idConv) {
              messages.push(...idConv.map((message) => ({ role: 'assistant', content: message })));
            }
        
            // Make the API call to OpenAI
            const completion = await openai.chat.completions.create({
              messages: messages,
              model: 'gpt-3.5-turbo',
            });
        
            // Extract the assistant's reply
            const assistantReply = completion.choices[0].message.content;
        
            // You can save the assistantReply to your database or perform any other necessary actions
        
            // Send the response back to the client
            res.json({ assistantReply });
          } catch (error) {
            console.error('Error sending message to chatbot:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }



    /* OpenAI Moderation API Result:
{
  "id": "modr-XXXXX",
  "model": "text-moderation-005",
  "results": [
    {
      "flagged": true,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": false,
        "self-harm": false,
        "sexual/minors": false,
        "hate/threatening": false,
        "violence/graphic": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "harassment/threatening": true,
        "violence": true,
      },
      "category_scores": {
        "sexual": 1.2282071e-06,
        "hate": 0.010696256,
        "harassment": 0.29842457,
        "self-harm": 1.5236925e-08,
        "sexual/minors": 5.7246268e-08,
        "hate/threatening": 0.0060676364,
        "violence/graphic": 4.435014e-06,
        "self-harm/intent": 8.098441e-10,
        "self-harm/instructions": 2.8498655e-11,
        "harassment/threatening": 0.63055265,
        "violence": 0.99011886,
      }
    }
  ]
}
    */