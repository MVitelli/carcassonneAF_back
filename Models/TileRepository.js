const Repository = require("./Repository");
const TileModel = require("./TileModel");

class TileRepository extends Repository {
    async getAll() {
        return this.model
            .find()
            .then((result) => {
                if (result.length) {
                    return result;
                }
            })
    }

    async count() {
        return this.model
            .countDocuments()
            .then((res) => {
                return res;
            })
    }

    async addTile(data) {
        let obj = new this.model(data)
        const res = await obj.save();
        return res;
    }

}

module.exports = new TileRepository(TileModel)