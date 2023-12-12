import mongoose from 'mongoose'
const {Schema, model} = mongoose

const bannedWordsSchema = new Schema(
    {
        word: {
            type: String,
            required: true
        },
        usedCount:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("BannedWords", bannedWordsSchema)