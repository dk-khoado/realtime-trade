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
                default:null
            },            
            value: {
                type: String,
                required: true
            },
            field_name: {
                type: String,
                default:null
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
    },
    disable_list: {
        type: [String],
        default: null
    }
})



module.exports = {
    BOT_SETTING: mongoose.model("BotSetting", BotSetting, "BotSetting")
}

// "modules": [
//     {
//         "module_id": ""
//     }
// ],