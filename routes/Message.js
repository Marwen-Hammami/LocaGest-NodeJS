import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdConv, deleteOne } from "../controllers/Message.js";

const router = express.Router()

//Créer un message
router
.route('/')
.post(
    body('conversationId').isString(),
    body('sender').isString(),
    body('text').isString(),
    body('file').isArray(),
    addOne
)

//Récupérer les messages d'une conversation
//Supprimer un message
router
.route('/:id')
.get(getAllWithIdConv)
.delete(deleteOne)

export default router