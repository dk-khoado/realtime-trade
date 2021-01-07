var mongoose = require('mongoose');
const Schema = mongoose.Schema

const BotSetting = new Schema({
    gruop_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    field_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    value: {
        type: String,
        required: true
    },
    strategy_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    symbol_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("BotSetting", BotSetting, "BotSetting")
