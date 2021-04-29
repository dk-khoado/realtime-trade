var mongoose = require('mongoose');
const Schema = mongoose.Schema

const Wallet = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    create_at: {
        type: Date,
        default: new Date()
    },
    balance: {
        type: Number,
        min: 0,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    }
})
const WalletTransation = new Schema({
    wallet_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    to_wallet_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    descriptions: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        required: true
    },
    transation_type: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    },
    status: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
})
module.exports = {
    Wallet: mongoose.model("Wallet", Wallet, "Wallet"),
    WalletTransation: mongoose.model("WalletTransation", WalletTransation, "WalletTransation"),
} 
