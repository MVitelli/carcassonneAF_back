const TileModel = require('../models/tiles');

const getAll = (req, res) => {
    TileModel.getAll()
        .then((result) => {
            if (!result) return res.status(404).send({ message: 'No tiles found' });
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
};

const count = (req, res) => {
    TileModel.count()
        .then((result) => {
            res.status(200).send({ count: result })
        })
        .catch((err) => {
            res.status(500).send({ message: `Error: ${err}` })
        })
}

const addTile = (req, res) => {
    TileModel.addTile(req.body)
        .then(() => {
            res.status(200).send("Creado exitosamente");
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
}

module.exports = {addTile, count, getAll}