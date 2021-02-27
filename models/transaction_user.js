var mongoose = require('mongoose');
const Schema = mongoose.Schema

const Transaction_UserSchema = new Schema({
    id_transaction: {
        type: String,
        default: Date.now
    },
    from: {
        type: Schema.Types.ObjectId,
        default: null
    },
    to: {
        type: Schema.Types.ObjectId,
        default: null
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        default: 0
    },
    percent: {
        type: Number
    },
    transaction_type: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
})

module.exports = {
    User: mongoose.model("TransactionUser", Transaction_UserSchema, "TransactionUser")
}
