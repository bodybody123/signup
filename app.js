const express = require('express'); //Server Framework
const path = require('path');
const mysql = require('mysql'); // connect to mysql
const dotenv = require('dotenv'); // Encryption
const cookieParser = require('cookie-parser');
//const cookieParser = require('cookie-parser');
dotenv.config({ path: './.env' });

const app = express();

const conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE,
});

//public directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Betak data dari URL
app.use(express.urlencoded({ extended: false }));
// Jadiin JSON
app.use(express.json());
//app.use(cookieParser());

app.set('view engine', 'hbs');

conn.connect((err) => {
    if (err) {
        console.log('Unable to connect');
    }
    else {
        console.log('Anjay nyambung');
    }
});

//routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//connect to localhost with port of 8080
app.listen(8080, () => {
    console.log("Running on port 8080");
});