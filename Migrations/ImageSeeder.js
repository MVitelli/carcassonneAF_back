const Jimp = require('jimp')

class ImageSeeder {

    constructor(imagePath, tilesNumber, tilesPerRow, tilesPerColumn) {
        this.imagePath = imagePath;
        this.tilesNumber = tilesNumber;
        this.tilesPerRow = tilesPerRow;
        this.tilesPerColumn = tilesPerColumn;
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

        for (let i = 0; i < this.tilesPerColumn; i++) {
            x = 0
            for (let j = 0; j < this.tilesPerRow && tilesCropped < this.tilesNumber; j++) {
                let cloneImage = jimpImage.clone()
                console.log(`creando ${tilesCropped + 1}.png`)
                await cloneImage
                    .crop(x, y, tileWidth, tileHeight)
                    .writeAsync(`../Images/1stEdition/tile_${tilesCropped + 1}.png`)
                    .catch((err) => console.error(err))
                x += tileWidth
                tilesCropped++
            }
            y += tileHeight
        }
    }

}

module.exports = ImageSeeder;