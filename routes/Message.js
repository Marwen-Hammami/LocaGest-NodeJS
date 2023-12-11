import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdConv, deleteOne, sendMessageToChatBot } from "../controllers/Message.js";
import { multipleFileUpload } from "../middlewares/multer-config.js";

const router = express.Router()

//Créer un message
router
.route('/')
.post(
    multipleFileUpload,
    body('conversationId').isString(),
    body('sender').isString(),
    addOne
)

//Récupérer les messages d'une conversation
//Supprimer un message
router
.route('/:id')
.get(getAllWithIdConv)
.delete(deleteOne)

//Les routes pour le chatbot de openai
router
.route('/chatBot')
.post(sendMessageToChatBot)

export default router