const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
const SymbolModel = require("../models/bot_stratery").Symbol
const FieldPropertiesModel = require("../models/bot_stratery").FieldProperties
const GruopModel = require("../models/bot_stratery").Gruop
const BotVersion = require("../models/bot_stratery").BotVersion
const AccountMt5 = require("../models/account_mt5").AccountMt5
const mongoose = require("mongoose")
class BotSettingService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_Group(body) {
        try {
            let item = await GruopModel.create({
                name: body.name
            })
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async getAll_gruop() {
        try {
            let item = await GruopModel.find({})
            return new Response(false, item);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async create_symbol(body) {
        try {
            let item = await SymbolModel.create({
                name: body.name
            })
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async getAll_symbol() {
        try {
            let item = await SymbolModel.find({})
            return new Response(false, item);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async getAll_fields() {
        try {
            let item = await FieldPropertiesModel.find({})
            return new Response(false, item);
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async create_fields(body) {
        try {
            let item = []
            for (let index = 0; index < body.items.length; index++) {
                const element = body.items[index];
                let result = await FieldPropertiesModel.findOneAndUpdate({
                    name: element.name
                }, element, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                    runValidators: true
                })
                item.push(result)
            }
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async create_setting(body) {
        try {
            let check_exist = await this.model.aggregate([{
                $match: {
                    // "gruop_id": mongoose.Types.ObjectId(body.gruop_id),
                    "strategy_id": mongoose.Types.ObjectId(body.strategy_id),
                    "symbol_id": mongoose.Types.ObjectId(body.symbol_id)
                }
            }, {
                $lookup: {
                    from: "Symbol",
                    localField: "symbol_id",
                    foreignField: "_id",
                    as: "symbol_id"
                }
            }, {
                $lookup: {
                    from: "BotStratery",
                    localField: "strategy_id",
                    foreignField: "_id",
                    as: "stratery"
                }
            }, {
                $project: {
                    symbol: {
                        $arrayElemAt: [
                            "$symbol_id.name",
                            0
                        ]
                    },
                    stratery: {
                        $arrayElemAt: [
                            "$stratery.name",
                            0
                        ]
                    }
                }
            }])
            if (check_exist.length > 0) {
                return new Response(true, {}, `symbol ${check_exist[0].symbol} của chiến lược {${check_exist[0].stratery}} đã được tạo`);
            }
            let item = await FieldPropertiesModel.find({})
            let query = {
                "gruop_id": body.gruop_id,
                "strategy_id": body.strategy_id,
                "symbol_id": body.symbol_id,
                "fields": []
            }
            for (let index = 0; index < item.length; index++) {
                const element = item[index];
                const index_field = body.fields.findIndex(v => v.field_id == element._id)
                query.fields.push({
                    field_id: element._id,
                    value: index_field > -1 ? body.fields[index_field].value : element.default_value,
                })
            }
            let result = await this.model.create(query)
            if (result) {
                return new Response(false, result);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async get_setting(stratery_id, symbol_id) {
        let result = await this.model.aggregate([{
            $match: {
                "strategy_id": mongoose.Types.ObjectId(stratery_id),
                "symbol_id": mongoose.Types.ObjectId(symbol_id)
            }
        }, {
            $lookup: {
                from: "Symbol",
                localField: "symbol_id",
                foreignField: "_id",
                as: "symbol_id"
            }
        }, {
            $lookup: {
                from: "BotStratery",
                localField: "strategy_id",
                foreignField: "_id",
                as: "stratery"
            }
        }, {
            $lookup: {
                from: "FieldProperties",
                localField: "fields.field_id",
                foreignField: "_id",
                as: "fields_info"
            }
        }, {
            $project: {
                symbol: {
                    $arrayElemAt: [
                        "$symbol_id.name",
                        0
                    ]
                },
                stratery: {
                    $arrayElemAt: [
                        "$stratery.name",
                        0
                    ]
                },
                fields: 1,
                fields_info: 1
            }
        }]);
        if (result.length > 0) {
            return new Response(false, result[0]);
        } else {
            return new Response(true, {}, 'Something wrong happened');
        }
    }

    async get_setting_byID(id) {
        let result = await this.model.aggregate([{
            $match: {
                "_id": mongoose.Types.ObjectId(id)
            }
        }, {
            $lookup: {
                from: "Symbol",
                localField: "symbol_id",
                foreignField: "_id",
                as: "symbol_id"
            }
        }, {
            $lookup: {
                from: "BotStratery",
                localField: "strategy_id",
                foreignField: "_id",
                as: "stratery"
            }
        }, {
            $lookup: {
                from: "FieldProperties",
                localField: "fields.field_id",
                foreignField: "_id",
                as: "fields_info"
            }
        }, {
            $project: {
                symbol: {
                    $arrayElemAt: [
                        "$symbol_id.name",
                        0
                    ]
                },
                stratery: {
                    $arrayElemAt: [
                        "$stratery.name",
                        0
                    ]
                },
                strategy_id: 1,
                fields: 1,
                fields_info: 1,
            },
        }]);
        if (result.length > 0) {
            return new Response(false, result[0]);
        } else {
            return new Response(true, {}, 'Something wrong happened');
        }
    }
    async update_setting(body) {
        try {
            let item = await this.model.findOne({
                "strategy_id": body.strategy_id,
                "symbol_id": body.symbol_id,
            })
            let rs = await BotVersion.findOne({
                $query: {},
                $orderby: {
                    _id: -1
                }
            })
            let query = {
                "$set": {}
            }
            let options = {
                arrayFilters: []
            }
            if (item.bot_version < rs.version) {
                let fields = await FieldPropertiesModel.find();
                let origin_data = item.fields;
                let dict_fields = new Object();
                for (let index = 0; index < fields.length; index++) {
                    let element = fields[index];
                    dict_fields[element._id] = {
                        field_id: element._id,
                        value: element.default_value
                    }
                }
                for (let i = 0; i < origin_data.length; i++) {
                    const element = origin_data[i];
                    if (dict_fields[element.field_id]) {
                        dict_fields[element.field_id].value = element.value
                    }
                }
                let rs_update_setting = await this.model.updateOne({
                    "strategy_id": body.strategy_id,
                    "symbol_id": body.symbol_id,
                }, { fields: Object.values(dict_fields), bot_version: rs.version })

                if (!rs_update_setting) {
                    throw "lỗi không thể cập nhật version setting";
                }
            }
            // return new Response(false, result);
            for (let index = 0; index < body.fields.length; index++) {
                const element = body.fields[index];
                let elt = `index${index}`
                let obj_option = {}
                obj_option[`${elt}.field_id`] = element.field_id
                query.$set[`fields.$[${elt}].value`] = element.value
                options.arrayFilters.push(obj_option)
            }
            let result = await this.model.updateOne({
                "strategy_id": body.strategy_id,
                "symbol_id": body.symbol_id,
            }, query, options)
            if (result) {
                return new Response(false, result);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
    async update_version_setting(body) {

    }
    async get_setting_by_account(id) {
        let account_info = await AccountMt5.findOne({ "username": id })
        let result = await this.model.aggregate([{
            $match: {
                "strategy_id": account_info.stratery_id
            }
        }, {
            $lookup: {
                from: "Symbol",
                localField: "symbol_id",
                foreignField: "_id",
                as: "symbol_id"
            }
        }, {
            $lookup: {
                from: "BotStratery",
                localField: "strategy_id",
                foreignField: "_id",
                as: "stratery"
            }
        }, {
            $lookup: {
                from: "FieldProperties",
                localField: "fields.field_id",
                foreignField: "_id",
                as: "fields_info"
            }
        }, {
            $project: {
                symbol: {
                    $arrayElemAt: [
                        "$symbol_id.name",
                        0
                    ]
                },
                stratery: {
                    $arrayElemAt: [
                        "$stratery.name",
                        0
                    ]
                },
                fields: 1,
                fields_info: 1,
            },
        }]);
        if (result.length > 0) {
            return new Response(false, result);
        } else {
            return new Response(true, {}, 'Something wrong happened');
        }
    }

    async update_bot_status(id) {
        try {
            let result = await this.model.aggregate([{
                $match: {
                    "_id": mongoose.Types.ObjectId(id)
                }
            }, {
                $project: {
                    _id: 1,
                    bot_status: 1
                }
            }]);

            let update = this.model.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    bot_status: result[0].bot_status == true ? false : true
                }
            });
            if (update) {
                return new Response(false, update);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }

    async disable_module(id, module_name) {
        try {
            const result = await this.model.findById(id);
            let disable_list = result.disable_list;
            let index = disable_list.findIndex(v => v == module_name)
            disable_list[index] = module_name;
        } catch (error) {
            return new Response(true, error);
        }
    }
}

module.exports = {
    BotSettingService
}