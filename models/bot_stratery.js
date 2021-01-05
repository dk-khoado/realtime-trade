var mongoose = require('mongoose');
const Schema = mongoose.Schema

const BotStratery = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    symbol_id: {
        type: Schema.Types.ObjectId,
        required:true,        
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
})


const Symbol = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },   
})
const Gruop = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },   
})

const FieldProperties = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },   
    aliases: {
        type: String,
        required: true,
        default:""
    },  
    description: {
        type: String,
        required: true,
        default:""
    }, 
    // 0: input text, 1: combobox
    type_input:{
        type: Number,
        required: true,
        default: 0
    } 
})
module.exports = {
    BotStratery: mongoose.model("BotStratery", BotStratery, "BotStratery"),
    Symbol: mongoose.model("Symbol", Symbol, "Symbol"),
    Gruop: mongoose.model("Gruop", Gruop, "Gruop"),
    FieldProperties: mongoose.model("FieldProperties", FieldProperties, "FieldProperties"),
}
