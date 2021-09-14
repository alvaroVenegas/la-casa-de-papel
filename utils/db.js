const mongoose = require('mongoose');
require('dotenv').config();

const urlDb = process.env.DB_URL || 'mongodb://localhost:27017/casa-de-papel'

const connect = async () => {
    try {
        const db = await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true});
        const { name, host } = db.connection;
        console.log(`Conected succesfully with ${name} in ${host}`);
    }catch(error) {
        console.log('Error to connect with db')
    };
}

module.exports = {
    connect,
    urlDb
};