const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tileSchema = new Schema({
    number: Number,
    image: String
})

const Tile = mongoose.model('Tile', tileSchema);

module.exports = Tile;