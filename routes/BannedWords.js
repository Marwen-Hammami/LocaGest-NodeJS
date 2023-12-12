import express from 'express'

import { addOne, deleteOne, updateOne, getAll } from "../controllers/BannedWords.js";

const router = express.Router()

//Bannir un mot
router
.route('/')
.post(
    addOne
)
.put(updateOne)
.get(getAll)

//Supprimer un mot de la liste
router
.route('/:id')
.delete(deleteOne)

export default router