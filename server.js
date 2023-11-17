
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import dotenv from 'dotenv'; 

dotenv.config();


import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import user  from './routes/user.js';

//import routes

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
app.use('/User', user);



//pp.use('/conversations', Conversation);
//Fin Appel des Routes ****************************************


app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });