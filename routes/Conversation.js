import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdUser, patchOne } from "../controllers/Conversation.js";
import { gameImageUpload } from "../middlewares/multer-config.js";

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
router
.route('/:id')
.get(getAllWithIdUser)
.patch(
    gameImageUpload,
    patchOne)

export default router