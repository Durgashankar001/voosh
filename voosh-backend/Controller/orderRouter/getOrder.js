const express = require("express")
const middleware = require("../../config/middleware")
const orderModel = require("../../Modal/orderModel")
const getorder = express.Router()
getorder.get("/", middleware, async (req, res) => {
    const user_id = req.query.user_id
    try {
        const newOrder = await orderModel.find({
            user_id: user_id
        })
        return res.status(200).send({ message: "Successfully geting data", data: newOrder })

    } catch {
        return res.status(500).send("Internal server error")
    }
})
module.exports = getorder