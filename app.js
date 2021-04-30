require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

const path = require('path')
const TilesRouter = require('./Routes/tiles');
const db = require('./db/connection') 

db.getConnection();

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api', TilesRouter);

//Static images of tiles
app.use('/Images/1stEdition/', express.static(path.join(__dirname, 'Images/1stEdition')))

app.listen(process.env.PORT, () => {
 console.log(`Listening on port: ${process.env.PORT}`)
})

module.exports = app;