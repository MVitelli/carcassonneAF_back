'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 8082;
mongoose.Promise = global.Promise;
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect('mongodb://localhost/carccassonneAF',
    { useUnifiedTopology: true, useNewUrlParser: true, user: 'root', pass: 'password', authSource: 'admin' })
    .then(() => {
        console.log("La conexión a la base de datos carccassonneAF se ha realizado correctamente")

        app.listen(port, () => {
            console.log(`servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err));