import mongoose from 'mongoose'
const {Schema, model} = mongoose

const messageSchema = new Schema(
    {
        conversationId: {
            type: String,
            required: true
          },
        sender: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
        },
        file: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("Message", messageSchema)