import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdUser, patchOne } from "../controllers/Conversation.js";

const router = express.Router()

//Créer une conversation
router
.route('/')
.post(
    body('members').isArray(),
    body('isGroup').isBoolean(),
    addOne
)

//Récupérer les conversation d'un utilisateur
//Modifier une conversation
//Modifier l'image d'une conversation de groupe
router
.route('/:id')
.get(getAllWithIdUser)
.patch(patchOne)

export default router