var mongoose = require('mongoose');
const Schema = mongoose.Schema

// type_notify
/**
 * 0: dạng thông báo hệ thống đến người dùng
 * 1: thông báo cho toàn hệ thống
 * 2: thông báo từ bot đến hệ thống
 */
const notification = new Schema({
    message: {
        type: String,
        default: "",
        required: true
    },
    type_notify: {
        type: Number,
        required: true
    },
    to_id_user: {
        type: Schema.Types.ObjectId,
        default: null
    },
    title: {
        type: String,
        default: "",
        required: true
    },
    create_at: {
        type: Date,
        default: new Date(),
    }
})
module.exports = {
    notification: mongoose.model("notification", notification, "notification"),
} 
