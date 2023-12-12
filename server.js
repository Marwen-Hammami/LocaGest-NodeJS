import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';

import { readdirSync } from "fs";

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

//import routes
import Agence from './routes/Agence.js';
import car from "./routes/car.js";
import user from './routes/user.js';
import Message from './routes/Message.js';
import Conversation from "./routes/Conversation.js";
import Reservation from './routes/reservation.js';
import Historique from './routes/historique.js';
import Distribution from './routes/distribution.js';
import Tools from './routes/tools.js';
import BannedWords from './routes/BannedWords.js';
import socketController from './socket/socketController.js';

const app = express();
const port = process.env.PORT || 9090;
const hostname = '127.0.0.1'
const databaseName = 'locagest';
const db_url = process.env.DB_URL || `mongodb://localhost:27017`;
const db_url_atlas = process.env.DB_URL_ATLAS || 'mongodb+srv://topadmin:topadmin@locagest.lehscxo.mongodb.net/?retryWrites=true&w=majority';


// Debut connexion à mongodb **********************************
//affiche les requetes mongodb dans le terminal
mongoose.set('debug', true)
// Utilisation des promesses ES6 pour mongodb
mongoose.Promise = global.Promise

//Se connecter à MongoDB : old : .connect(`mongodb://${hostname}:27017/${databaseName}`)
mongoose
    .connect(db_url_atlas)
    .then(() => {
        console.log(`Connected to ${databaseName}`)
    })
    .catch(err => {
        console.log(err)
    })
    
// Fin   connexion à mongodb **********************************


//Debut Appel des MiddleWares *********************************
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));
//Fin Appel des MiddleWares *********************************** 

app.use(morgan("dev"));

app.use('/uploads', express.static('uploads'));

//Debut Appel des Routes **************************************

app.use('/agence', Agence)
app.use('/res',Reservation); //m3aha hethy
app.use('/histo',Historique);
app.use('/car', car)
app.use('/User', user);
app.use('/messages', Message);
app.use('/conversations', Conversation);
app.use('/bannedWords', BannedWords);

app.use('/distribution', Distribution);
app.use('/tools', Tools);
//Fin Appel des Routes ****************************************


app.use(notFoundError);
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

// Debut SocketIo *********************************************
  socketController(server);
// Fin SocketIo ***********************************************