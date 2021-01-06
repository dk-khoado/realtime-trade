const ServiceBase = require("../helpers/ServicesBase").ServiceBase

const SymbolModel = require("../models/bot_stratery").Symbol
const FieldPropertiesModel = require("../models/bot_stratery").FieldProperties
const GruopModel = require("../models/bot_stratery").Gruop

class BotSettingService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async create_Group(body) {    
        try {
            let item = await GruopModel.create({name: body.name})
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true,error, "Error");
        }
    }
}

module.exports = { BotSettingService }