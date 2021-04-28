require('dotenv').config()
const mongoose = require('mongoose');

getConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost/carcassonneAF', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            user: 'root',
            pass: 'example',
            authSource: 'admin'
        });
        console.log("Db connection succesfull")
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getConnection };