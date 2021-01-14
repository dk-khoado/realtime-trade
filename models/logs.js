var mongoose = require('mongoose');
const Schema = mongoose.Schema

const Logs = new Schema({
    action: { type: String, required: true },

    colection_name: { type: String, required: true },

    query: { type: String, default:"" },
    doc: { type: String, default:"" },
    createdAt: {
        type: Date,
        index: true,
        expires: 172800
    }
}, {

    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model("Logs", Logs, "Logs")
