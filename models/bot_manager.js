var mongoose = require('mongoose');
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');
const BotStatus = new Schema({
    cretaeAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdate: {
        type: Date,
        default: new Date()
    },
    bot_active_key: {
        type: String,
        default: uuidv4()
    },
    ping_terminal: {
        type: Number,
        default: 0
    },
    cpu: {
        type: Number,
        default: 0
    },
    ram: {
        type: Number,
        default: 0
    },
    link_account: {
        type: String,
        default: null
    },    
    nick_name: {
        type: String,
        default: "bot-" + Date.now()
    },
    //0:hoạt động, 1:reloading, 2: pause,3:error
    state:{
        type:Number,
        default:0
    },
    isDelete:{
        type: Boolean,
        default: false
    }
})
const BotControl = new Schema({
    modules_disable: [{ type: String }],
    turn_on: {
        type: Boolean,
        default: true
    },
    bot_status_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
})

BotStatus.pre('save', function (next) {
    this.lastUpdate = Date.now()
    if (this.isModified('cretaeAt')) {
        throw 'cretaeAt is read only!'
    }
    else {
        next();
    }
});
module.exports = {
    BotStatus: mongoose.model("BotStatus", BotStatus, "BotStatus"),
    BotControl: mongoose.model("BotControl", BotControl, "BotControl")
}