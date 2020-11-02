'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')

var app = express();
var TilesRouter = require('./Routes/tiles'); 

//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Cargamos las rutas
app.use('/api', TilesRouter);
//Static images of tiles
app.use('/Images/1stEdition/', express.static(path.join(__dirname, 'Images/1stEdition')))

module.exports = app;