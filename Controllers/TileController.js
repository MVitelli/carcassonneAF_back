const Tile = require("../Models/TileModel");
const path = require('path');
const TileRepository = require("../Models/TileRepository");

const repo =  new TileRepository(Tile);

const getAll = (req, res) => {
    repo.getAll()
        .then((result) => {
            if (!result) return res.status(404).send({ message: 'No tiles found' });
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(`err`, err)
            res.status(500).send({ message: err })
        })
};

const count = (req, res) => {
    repo.count()
        .then((result) => {
            res.status(200).send({ count: result })
        })
        .catch((err) => {
            res.status(500).send({ message: `Error: ${err}` })
        })
}

const addTile = (req, res) => {
    repo.addTile(req.body)
        .then(() => {
            res.status(200).send("Succesful");
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
}

const download = (req, res)=> {
    res.sendFile(path.resolve(process.env.STORAGE_PATH + "tile_" + req.params.number + ".png"))
}

module.exports = {addTile, count, getAll, download}