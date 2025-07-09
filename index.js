const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const app = express();

//BD
dbConnection();

//CORS
app.use(cors());

//public directory
app.use(express.static('public'));

//read and parse body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

// Launch the server and listen for incoming requests on port 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 4000')
});