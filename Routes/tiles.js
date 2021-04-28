var express = require('express');
var TilesController = require('../Controllers/TileController')
var api = express.Router();

api.get('/tiles', TilesController.getAll)
    .get('/count', TilesController.count)
    .post('/tiles', TilesController.addTile)
    .get('/tiles/:number', TilesController.download)

module.exports = api;