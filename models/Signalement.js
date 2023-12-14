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
        raison:{
            type:String,
            enum: ['Harcèlement', 'Suicide ou automutilation', 'Contenue Inaproprié'
            , 'Discours haineux', 'Illégal','Arnaque', 'autre'],
        },
        raisonAutre:{
            type: String,
            require: false
        },
        traite: {
            type: Boolean,
            default: false
        },
        traiteAutomatiquement: {
            type: Boolean,
            default: false
        },
        signalementPertinant: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Ajouter automatiquement createdAt et updatedAt
    }
)

export default model("Signalement", signalementSchema)