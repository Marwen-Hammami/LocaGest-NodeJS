import mongoose from "mongoose";

const {Schema, model} = mongoose;

const agenceSchema = new Schema({
    AgenceName: String,
    Adresse: String,
    IdHead: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    longitude: Number,
    latitude: Number,
});

const Agence = model('Agence', agenceSchema);

export default Agence;