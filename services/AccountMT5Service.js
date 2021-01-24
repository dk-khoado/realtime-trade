const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const mongoose = require("mongoose")
const Response = require("../helpers/SevicesResponse")


class AccountMT5Service extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async get_all_account() {
        try {
            let result = await this.model.aggregate([
            {
                $lookup: {
                    from: "BotStratery",
                    localField: "stratery_id",
                    foreignField: "_id",
                    as: "stratery"
                }
            },
            {
                $project: {
                    stratery_name: {
                        $ifNull:[{$arrayElemAt: [
                            "$stratery.name",
                            0
                        ]}, null]
                        
                    },
                    stratery_id:{
                        $ifNull:[
                            "$stratery_id", null]
                    },
                    username: 1,
                    initial_balance: 1,
                    current_balance: 1
                },
            }
            ])
            return new Response(false, {items: result, total: result.length});
        } catch (error) {           
            return new Response(true, error, "Error");
        }
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