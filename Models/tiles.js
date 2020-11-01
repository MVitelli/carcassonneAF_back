const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tileSchema = new Schema({
    number: Number,
    image: String
})

const Tile = mongoose.model('Tile', tileSchema);

const getAll = async () => {
    return Tile
        .find()
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            return result;
        })
}

const count = async () => {
    return Tile
        .countDocuments()
        .then((res) => {
            return res;
        })
}

const addTile = async (data) => {
    let tile = new Tile(data)
    const res = await tile.save();
    return res;
}

// exports.findById = (id) => {
//     return Game.findById(id).then((result) => {
//         result = result.toJSON();
//         delete result._id;
//         return result;
//     });
// }

module.exports = {getAll, count, addTile}