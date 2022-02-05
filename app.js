import express from 'express';
import path from 'path';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import pages from './routes/pages.js';
import auth from './routes/auth.js';
//const cookieParser = require('cookie-parser');
dotenv.config({ path: './.env' });

const app = express();

const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todo'
});


const __dirname = import.meta.url;

//public directory
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cookieParser());

app.set('view engine', 'hbs');

conn.connect((err) => {
    if (err) {
        console.log('Unable to connect');
    }
    else {
        console.log('connected');
    }
});

//routes
app.use('/', pages);
app.use('/auth', auth);

//connect to localhost with port of 8080
app.listen(8080, () => {
    console.log("Running on port 8080");
});