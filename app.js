import 'dotenv/config'
import config from "./src/config/index"
import passport from 'passport'
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dbConnection from './src/utils/db_connection';
import { gAuth } from './src/midldleware/auth';
import { routesG } from './src/routes';
import session from 'express-session';
import MongoStore from 'connect-mongo'
const app = express();

const PORT = config.PORT || 8040;

app.use(cors())
app.use(express.json())

console.log(config.SESSION_SECRET);
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    store: MongoStore.create( {mongoUrl : config.DB_CONNECTION_STRING}),
    saveUninitialized: false,
    cookie : {
        secure : false,
        expires : new Date(Date.now() + 10000),
        maxAge : 10000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('http://localhost:8040',(req, res, next) => {res.send("<h2>it's working</h2>");next();});

app.get('/', (req, res, next) => {
    res.send('<a href="http://localhost:8040/auth/google">Login with google son</a>');
    next();
})

app.listen(PORT , () => {
    console.log(`server is up and running on port ${PORT} `)
    dbConnection();
    gAuth(passport);
    routesG(app,passport);
})