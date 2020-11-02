var TileModel = require('../Models/tiles')
var ImageSeeder = require('../Migrations/ImageSeeder.js')
var imageEraser = require('../Migrations/Eraser')
require('dotenv').config()


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carccassonneAF',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: 'root',
        pass: 'password',
        authSource: 'admin'
    })
    .then(() => {
        console.log("La conexión a la base de datos carccassonneAF se ha realizado correctamente")
    })
    .catch(err => console.log(err));



TileModel.count().then(res => {
    console.log("TileCount: ", res)
    if (res > 0) {
        console.log("Tile collection already initialized: ");
        mongoose.disconnect();
        return;
    }
    imageEraser('./Images/1stEdition');
    let mySeeder = new ImageSeeder('./Images/tiles_first_edition.png', '/Images/1stEdition/', 82, 23, 4)
    return mySeeder.load()
})
    .then((tilesToMigrate) => {
        console.log("tiles: ", tilesToMigrate)
        return TileModel.Tile.insertMany(tilesToMigrate.map((tile)=>{
            tile.image = `${process.env.APP_URL}:${process.env.PORT}${tile.image}`
            return tile
        }))
    })
    .then(() => {
        console.log("Seeder and Migration finished")
        mongoose.disconnect();
    })




