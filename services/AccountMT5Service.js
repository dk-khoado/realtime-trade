const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const mongoose = require("mongoose")


class AccountMT5Service extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async get_stratery(id) {
        try {
            let result = this.model.aggregate([{
                $match: {
                    "_id": mongoose.Types.ObjectId(id),
                }
            },
            {
                $lookup: {
                    from: "BotStratery",
                    localField: "stratery_id",
                    foreignField: "_id",
                    as: "stratery"
                }
            }])
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { AccountMT5Service }