const Jimp = require('jimp')
const path = require('path');

class ImageSeeder {
    constructor(imagePath, imageOutputPath, tilesNumber, tilesPerRow, tilesPerColumn) {
        this.imagePath = imagePath;
        this.imageOutputPath = imageOutputPath;
        this.tilesNumber = tilesNumber;
        this.tilesPerRow = tilesPerRow;
        this.tilesPerColumn = tilesPerColumn;
        this.tilesToMigrate = []
    }

    // image.bitmap.data; // a Buffer of the raw bitmap data
    // image.bitmap.width; // the width of the image
    // image.bitmap.height; // the height of the image

    async load() {
        try {
            const res = await Jimp.read(this.imagePath);
            return this.cropImage(res);
        } catch (err) {
            console.error(err);
        }
    }

    async cropImage(jimpImage) {
        let { width, height } = jimpImage.bitmap;
        console.log(`width: ${width}, height: ${height}`)
        const tileWidth = width / this.tilesPerRow
        const tileHeight = height / this.tilesPerColumn
        let x = 0;
        let y = 0;
        let tilesCropped = 0;
        let tileFS = path.resolve(this.imageOutputPath);
        console.log(`tileFS`, tileFS)

        for (let i = 0; i < this.tilesPerColumn; i++) {
            x = 0
            for (let j = 0; j < this.tilesPerRow && tilesCropped < this.tilesNumber; j++) {
                let cloneImage = jimpImage.clone()
                let tileURL = `${this.imageOutputPath}tile_${tilesCropped + 1}.png`
                console.log(`creando ${tilesCropped + 1}.png`)
                await cloneImage
                    .crop(x, y, tileWidth, tileHeight)
                    .writeAsync(`${tileFS}tile_${tilesCropped + 1}.png`)
                    .catch((err) => console.error(err))
                
                x += tileWidth
                tilesCropped++
                this.tilesToMigrate.push({image:tileURL, number: tilesCropped}) 
            }
            y += tileHeight
        }
        return this.tilesToMigrate;
    }

}

module.exports = ImageSeeder;