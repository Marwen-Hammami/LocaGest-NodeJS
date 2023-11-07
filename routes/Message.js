import express from 'express'
import { body } from "express-validator"

import { addOne, getAllWithIdConv, deleteOne } from "../controllers/Message.js";
import { ImageUpload, multipleImageUpload } from "../middlewares/multer-config.js";

const router = express.Router()

//Créer un message
router
.route('/')
.post(
    multipleImageUpload,
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

export default router