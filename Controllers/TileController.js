const path = require('path');
const TileRepository = require("../Models/TileRepository");

const getAll = (req, res) => {
    TileRepository.getAll()
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
    TileRepository.count()
        .then((result) => {
            res.status(200).send({ count: result })
        })
        .catch((err) => {
            res.status(500).send({ message: `Error: ${err}` })
        })
}

const addTile = (req, res) => {
    TileRepository.addTile(req.body)
        .then(() => {
            res.status(200).send("Succesful");
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
}

const download = (req, res) => {
    res.sendFile(path.resolve(process.env.STORAGE_PATH + "tile_" + req.params.number + ".png"))
}

module.exports = { addTile, count, getAll, download, search }