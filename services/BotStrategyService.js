const ServiceBase = require("../helpers/ServicesBase").ServiceBase

const SymbolModel = require("../models/bot_stratery").Symbol
const FieldPropertiesModel = require("../models/bot_stratery").FieldProperties
const GruopModel = require("../models/bot_stratery").Gruop

class BotStrategyService extends ServiceBase{
    constructor(model) {
        super(model);                  
    }
}

module.exports = {BotStrategyService}