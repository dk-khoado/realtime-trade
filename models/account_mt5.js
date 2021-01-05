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
})
module.exports = mongoose.model("AccountMt5", AccountMt5, "AccountMt5")
