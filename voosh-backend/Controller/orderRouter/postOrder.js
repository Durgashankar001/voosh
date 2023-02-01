const express = require("express")
const middleware = require("../../config/middleware")
const orderModel = require("../../Modal/orderModel")
const postorder = express.Router()
postorder.post("/", middleware, async (req, res) => {
    // const user_id = req.query.user_id
    const { user_id, phone_number, sub_total } = req.body
    try {
        const newOrder = await orderModel.create(req.body)
        return res.status(200).send("Order Placed Successfully")

    } catch {
        return res.status(500).send("Internal server error")
    }
})
module.exports = postorder