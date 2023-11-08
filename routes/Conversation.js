import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdUser, patchOne } from "../controllers/Conversation.js";
import { FileUpload } from "../middlewares/multer-config.js";

const router = express.Router()

//Créer une conversation
router
.route('/')
.post(
    FileUpload,
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
    FileUpload,
    patchOne)

export default router