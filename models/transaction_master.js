var mongoose = require('mongoose');
const Schema = mongoose.Schema

const Transaction_AdminSchema = new Schema({
    id_transaction: {
        type: String,
        default: Date.now,
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
    Admin: mongoose.model("TransactionAdmin", Transaction_AdminSchema, "TransactionAdmin")
}
