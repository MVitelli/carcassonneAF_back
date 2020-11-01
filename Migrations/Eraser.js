const fs = require('fs');
const path = require('path');

const directory =  '../Images/1stEdition';

const imageEraser = () => {
    fs.readdir(directory, (err, files) => {
        if (err)
            throw err;

        for (const file of files) {
            console.log(file)
            fs.unlink(path.join(directory, file), err => {
                if (err)
                    throw err;
            });
        }
    });
}

module.exports = imageEraser