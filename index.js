'use strict'
require('dotenv').config({path: process.argv[2]})
var mongoose = require('mongoose');
var app = require('./app');
mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect('mongodb://localhost/carccassonneAF',
    { useUnifiedTopology: true, useNewUrlParser: true, user: 'root', pass: 'password', authSource: 'admin' })
    .then(() => {
        console.log("La conexión a la base de datos carccassonneAF se ha realizado correctamente")

        app.listen(process.env.PORT, () => {
            console.log(`servidor corriendo en ${process.env.APP_URL}:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));