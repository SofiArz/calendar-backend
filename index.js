const express = require('express');
require('dotenv').config();

const app = express();

//public directory
app.use( express.static('public'));

//routes
app.use('/api/auth', require('./routes/auth'));

// Launch the server and listen for incoming requests on port 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 4000')
});