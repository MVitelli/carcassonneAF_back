const TileRepository = require('../Models/TileRepository')
const ImageSeeder = require('../Migrations/ImageSeeder.js')
const imageEraser = require('../Migrations/Eraser')
require('dotenv').config()


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carcassonneAF',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: 'root',
        pass: 'example',
        authSource: 'admin'
    })
    .then(() => {
        console.log("La conexión a la base de datos carccassonneAF se ha realizado correctamente")
    })
    .catch(err => console.log(err));



TileRepository.count()
    .then(res => {
        console.log("TileCount: ", res)
        if (res > 0) {
            console.log("Tile collection already initialized: ");
            mongoose.disconnect();
            return;
        }
        // imageEraser('./Images/1stEdition');

        // const mySeeder = new ImageSeeder(process.env.IMAGE_PATH, process.env.STORAGE_PATH, 82, 23, 4)
        const mySeeder = new ImageSeeder(process.env.IMAGE_PATH, process.env.STORAGE_PATH, 156, 16, 10)

        mySeeder.load()
            .then(tilesToMigrate => {
                return TileRepository.model.insertMany(tilesToMigrate.map((tile) => {
                    tile.image = `${process.env.APP_URL}:${process.env.PORT}${tile.image}`
                    return tile
                }))
            })
            .then(() => {
                console.log("Seeder and Migration finished")
                mongoose.disconnect();
            })
            .catch(err=> {
                console.log(`err`, err)
            })
    })
