const mongoose = require('mongoose');

const urlDb = 'mongodb://localhost:27017/casa-de-papel'

const connect = async () => {
    try {
        await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Conected with db succesfully`);
    }catch(error) {
        console.log('Error to connect with db')
    };
}

module.exports = {
    connect,
    urlDb
};