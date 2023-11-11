import mongoose from 'mongoose'
const {Schema, model} = mongoose

const conversationSchema = new Schema(
    {
        members: {
            type: Array,
            required: true
        },
        isGroup: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("Conversation", conversationSchema)