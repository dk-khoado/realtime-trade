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
    },
    bot_status: {
        type: Boolean,
        default: false
    }
})

const Bot_Control = new Schema({
    account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    bot_setting_id: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
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
    modules: [
        {
            module_id: {
                type: Schema.Types.ObjectId,
                default: null,
                index: true
            }
        }
    ],
    tokens: {
        type: Number,
        default: 0
    },
    token_used: {
        type: Number,
        default: 0
    },
    is_refesh: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: null
    }
})

module.exports = {
   BOT_SETTING: mongoose.model("BotSetting", BotSetting, "BotSetting"),
   BOT_CONTROL: mongoose.model("BotConfig", Bot_Control, "BotConfig")
}

// "modules": [
//     {
//         "module_id": ""
//     }
// ],