const fs = require('fs');
const path = require('path');

const imageEraser = (directory) => {
    fs.readdir(path.resolve(directory), (err, files) => {
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