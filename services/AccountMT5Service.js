const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const mongoose = require("mongoose")
const Response = require("../helpers/SevicesResponse")
const AccountGroup = require("../models/account_mt5").AccountGroup

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
                            $ifNull: [{
                                $arrayElemAt: [
                                    "$stratery.name",
                                    0
                                ]
                            }, null]

                        },
                        stratery_id: {
                            $ifNull: [
                                "$stratery_id", null]
                        },
                        username: 1,
                        initial_balance: 1,
                        current_balance: 1
                    },
                }
            ])
            return new Response(false, { items: result, total: result.length });
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
    async get_account_by_strategy_id(id) {
        try {
            let result = await this.model.find({ stratery_id: id });
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_all_group() {
        try {
            let result = await AccountGroup.find();
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async get_detail_group(id) {
        try {
            let result = []
            if (id == 0) {
                result = await this.model.find({ group_id: null })

            } else {
                result = await this.model.find({ group_id: id })

            }
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async create_group(body) {
        try {
            let result = await AccountGroup.create({ name: body.name })
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async apply_group(body) {
        try {
            let result = await this.model.updateOne({ id: body.id }, { group_id: body.group_id })
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async update_banlance_account(body) {
        try {
            let result = await this.model.updateOne({ username: body.username },
                { current_balance: body.current_balance })
            return new Response(false, result);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

}

module.exports = { AccountMT5Service }