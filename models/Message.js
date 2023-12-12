import mongoose from 'mongoose'
const {Schema, model} = mongoose

const messageSchema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation"
          },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: false
        },
        file: {
            type: Array,
            required: false
        },
        Archive:{
            type: Boolean,
            default: false
        },
        Supprime:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("Message", messageSchema)