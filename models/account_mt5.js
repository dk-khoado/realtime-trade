var mongoose = require('mongoose');
const Schema = mongoose.Schema

const AccountMt5 = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    initial_balance: {
        type: Number,
        default: 0
    },
    current_balance: {
        type: Number,
        default: 0
    },
    stratery_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    group_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    is_delete: {
        type: Boolean,
        default: false
    }
})
const AccountGroup = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    is_delete: {
        type: Boolean,
        default: false
    }
})
const Broker = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,       
        required: true
    },
    is_delete: {
        type: Boolean,
        default: false
    }
})
module.exports = {
    AccountMt5: mongoose.model("AccountMt5", AccountMt5, "AccountMt5"),
    AccountGroup: mongoose.model("AccountGroup", AccountGroup, "AccountGroup"),
    Broker: mongoose.model("Broker", Broker, "Broker")
}
