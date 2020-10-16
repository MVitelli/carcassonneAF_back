// Cargamos el módulo de express para poder crear rutas
var express = require('express');
var TilesController = require('../Controllers/tiles')
// Llamamos al router
var api = express.Router();
api.get('/tiles', TilesController.getAll);
api.get('/count', TilesController.count);
api.post('/tiles', TilesController.addTile);
// Exportamos la configuración
module.exports = api;