const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tileSchema = new Schema({
    name: String,
    image: String
})

const Tile = mongoose.model('Tile', tileSchema);

exports.getAll = () => {
    return Tile
        .find()
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            return result;
        })
}

exports.count = () => {
    return Tile
        .countDocuments()
        .then((res) => {
            return res;
        })
}

exports.addTile = (data) => {
    let tile = new Tile(data)
    return tile.save()
        .then((res) => {
            return res
        })
}

// exports.findById = (id) => {
//     return Game.findById(id).then((result) => {
//         result = result.toJSON();
//         delete result._id;
//         return result;
//     });
// }