const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Database connection established successfully. ${con.connection.host}`);
    }
    catch (error) {
        console.log('Database connection error:', error);
        throw new Error('Database initialization failed. Ensure the database server is running and connection credentials are correct.');
    }
}

module.exports = { dbConnection };