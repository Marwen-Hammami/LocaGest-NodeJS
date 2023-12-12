import mongoose from 'mongoose'
const {Schema, model} = mongoose

const signalementSchema = new Schema(
    {
        messageId: {
            type: Schema.Types.ObjectId,
            ref: "Message"
          },
        signaleurId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        traite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("Signalement", signalementSchema)