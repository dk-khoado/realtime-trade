var mongoose = require('mongoose');
const Schema = mongoose.Schema

const BotStatus = new Schema({
    cretaeAt: {
        type: Date,
        default: new Date(),
    },
    lastUpdate: {
        type: Date,
        default: new Date()
    },
    botActiveKey: {
        type: String,
        default: null
    },
    pingTerminal: {
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
    linkAccount: {
        type: String,
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
    BotStatus: mongoose.model("BotStatus", BotStatus, "BotStatus")
}