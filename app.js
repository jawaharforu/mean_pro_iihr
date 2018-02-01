const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');

//Database connect
mongoose.connect(config.database);
//Connected on
mongoose.connection.on('connected', () => {
    console.log('Database connected '+ config.database);
});
//DB Error 
mongoose.connection.on('error', (err) => {
    console.log('Database '+ err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;
 
// COES middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send("just for checking");
});

app.listen(port, () => {
    console.log("Server start at "+port);
});