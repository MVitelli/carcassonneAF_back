var TileModel = require('../Models/tiles')
var ImageSeeder = require('../Migrations/ImageSeeder.js')
var imageEraser = require('../Migrations/Eraser')

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
    imageEraser();
    let mySeeder = new ImageSeeder('../Images/tiles_first_edition.png', 82, 23, 4)
    return mySeeder.load()
}).then(() => {
    console.log("Transaction finished")
    mongoose.disconnect();
})




