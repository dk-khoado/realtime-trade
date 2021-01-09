var mongoose = require('mongoose');
const Schema = mongoose.Schema

const BotStratery = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    create_by: {
        type: String,
        default: "admin",
    },
    sate: {
        type: Number,
        default: 0
    }
})


const Symbol = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: (v) => new String(v).toUpperCase()
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
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    group_name: {
        type: String,
        required:true
    },
    // 0: input text, 1: combobox
    type_input: {
        type: Number,
        required: true,
        default: 0
    },
    default_value: {
        type: String,
        required: true
    },
    select_value: [{
        value_type: {
            type: String,
            required: true
        },
        default_value: {
            type: String,
            required: true
        }
    }]
})
module.exports = {
    BotStratery: mongoose.model("BotStratery", BotStratery, "BotStratery"),
    Symbol: mongoose.model("Symbol", Symbol, "Symbol"),
    Gruop: mongoose.model("Gruop", Gruop, "Gruop"),
    FieldProperties: mongoose.model("FieldProperties", FieldProperties, "FieldProperties"),
}
