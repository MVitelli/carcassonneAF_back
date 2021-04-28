'use strict'
const express = require('express');
const path = require('path')
const app = express();
const TilesRouter = require('./Routes/tiles');
const db = require('./db/connection') 
require('dotenv').config()

db.getConnection();

app.listen(process.env.PORT, () => {
 console.log(`Listening on port: ${process.env.PORT}`)
})
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api', TilesRouter);

//Static images of tiles
app.use('/Images/1stEdition/', express.static(path.join(__dirname, 'Images/1stEdition')))

module.exports = app;