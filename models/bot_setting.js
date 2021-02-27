var mongoose = require('mongoose');
const Schema = mongoose.Schema

const BotSetting = new Schema({
    gruop_id: {
        type: Schema.Types.ObjectId,
        default: null,
        index: true
    },
    fields: [
        {
            field_id: {
                type: Schema.Types.ObjectId,
                required: true,
                index: true
            },
            value: {
                type: String,
                required: true
            },
        }
    ],
    strategy_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    symbol_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    time_frames: {
        type: Number,
        required: true,
        default: 60,
        min: 1,
        max: 240
    },
    
    bot_version: {
        type: Number,
        default: 0.0
    }
})

module.exports = mongoose.model("BotSetting", BotSetting, "BotSetting")
