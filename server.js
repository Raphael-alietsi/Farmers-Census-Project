const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const {check, validationResult} = require('express-validator');


const app = express();

//Middleware

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

app.use(session({
    secret:'hteudff4knhr9',
    resave:false,
    saveUninitialized: false
}));



//Create connection
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD
});


///Check connection //Connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database successfully!');
});

//Create database
connection.query('CREATE DATABASE if not exists census', (err, result) => {
    if (err) throw (err)
    console.log('Database created successfully');
});


//Access database
connection.query('USE census', (err, result) => {
    if(err) throw (err)
        console.log('Database accessed successfully');
});


//Display routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});



//Routes
//Create Record
app.post('/register', (req, res) => {
    const {name, id_number, constituency} = req.body;    

    const query = 'INSERT INTO farmers (name, id_number, constituency) VALUES (?, ?, ?)';    
    connection.query(query, [name, id_number, constituency], (err, result) => {    
    if (err) {    
        return res.status(500).json({ error: err.message });    
    }
        res.redirect('/');
    }); 

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
});



app.listen(8050, () => {
    console.log('Server running at port 8050')
});