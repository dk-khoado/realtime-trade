var mongoose = require('mongoose');
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');
const BotStatus = new Schema({
    createAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdate: {
        type: Date,
        default: new Date()
    },
    bot_active_key: {
        type: Schema.Types.String,        
        required: true
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
    state: {
        type: Number,
        default: 0
    },
    isDelete: {
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
const TypeOrders = new Schema({
    ticket: {
        type: String,
        unique: true
    },
    type_order: {
        type: Number,
        default: 0
    },
    group: {
        type: Number,
        default: 0
    },
})
const ActiveKey = new Schema({
    createAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdate: {
        type: Date,
        default: new Date()
    },
    key:{
        type:String,
        default:uuidv4()
    },
    email:{
        type:String,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    expiredAt:{
        type: Date,
        default: null,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})
BotStatus.pre('save', function (next) {
    this.lastUpdate = Date.now()
    if (this.isModified('createAt')) {
        throw 'createAt is read only!'
    }
    else {
        next();
    }
});
ActiveKey.pre('save', function (next) {
    this.lastUpdate = Date.now()
    if (this.isModified('createAt')) {
        throw 'createAt is read only!'
    }
    else {
        next();
    }
});
module.exports = {
    BotStatus: mongoose.model("BotStatus", BotStatus, "BotStatus"),
    BotControl: mongoose.model("BotControl", BotControl, "BotControl"),
    TypeOrders: mongoose.model("TypeOrders", TypeOrders, "TypeOrders"),
    ActiveKey: mongoose.model("ActiveKey", ActiveKey, "ActiveKey"),
}