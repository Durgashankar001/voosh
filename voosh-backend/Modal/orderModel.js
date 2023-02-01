const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
})
const orderModel = mongoose.model("order", orderSchema)
module.exports = orderModel