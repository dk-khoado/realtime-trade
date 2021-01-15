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
})
module.exports = mongoose.model("AccountMt5", AccountMt5, "AccountMt5")
