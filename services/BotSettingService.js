const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const Response = require("../helpers/SevicesResponse")
const SymbolModel = require("../models/bot_stratery").Symbol
const FieldPropertiesModel = require("../models/bot_stratery").FieldProperties
const GruopModel = require("../models/bot_stratery").Gruop

class BotSettingService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_Group(body) {
        try {
            let item = await GruopModel.create({ name: body.name })
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
            let item = await SymbolModel.create({ name: body.name })
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
            let item = await FieldPropertiesModel.updateOne({name: body.name}, body, {upsert: true})
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
            let item = await FieldPropertiesModel.find({})
            
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true, error, "Error");
        }
    }
}

module.exports = { BotSettingService }