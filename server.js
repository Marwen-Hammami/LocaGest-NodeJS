import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
//import jwt from'jsonwebtoken';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

//import routes
import car from "./routes/car.js";
import user from './routes/user.js';
import technician from './routes/technicien.js';
import client from './routes/client.js';
import admin from './routes/admin.js'
import Message from './routes/Message.js';
import Conversation from "./routes/Conversation.js";

const app = express();
const port = process.env.PORT || 9090;
const hostname = '127.0.0.1'
const databaseName = 'locagest';
const db_url = process.env.DB_URL || `mongodb://localhost:27017`;


// Debut connexion à mongodb **********************************
//affiche les requetes mongodb dans le terminal
mongoose.set('debug', true)
// Utilisation des promesses ES6 pour mongodb
mongoose.Promise = global.Promise

//Se connecter à MongoDB
mongoose
    .connect(`mongodb://${hostname}:27017/${databaseName}`)
    .then(() => {
        console.log(`Connected to ${databaseName}`)
    })
    .catch(err => {
        console.log(err)
    })
    
// Fin   connexion à mongodb **********************************


const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);



//Debut Appel des MiddleWares *********************************
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));
app.use(bodyParser.json());

//Fin Appel des MiddleWares *********************************** 


//Debut Appel des Routes **************************************
app.use('/car', car)
app.use('/User', user);
app.use('/tech', technician);
app.use('/Client', client);
app.use('/admin', admin);
app.use('/messages', Message);
app.use('/conversations', Conversation);
//Fin Appel des Routes ****************************************


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });