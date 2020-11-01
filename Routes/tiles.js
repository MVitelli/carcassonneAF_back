var express = require('express');
var TilesController = require('../Controllers/tiles')
var api = express.Router();

api.get('/tiles', TilesController.getAll);
api.get('/count', TilesController.count);
api.post('/tiles', TilesController.addTile);
api.get('/tiles/:number',TilesController.download);

module.exports = api;