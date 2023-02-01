const express = require("express")
const connect = require("../config/Connect")
const dotenv = require("dotenv")
dotenv.config("./.env")
const cors = require("cors")
const mongoose = require("mongoose")
const addUser = require("../Controller/userRouter/add-user")
const loginUser = require("../Controller/userRouter/login-user")
const postorder = require("../Controller/orderRouter/postOrder")
const getorder = require("../Controller/orderRouter/getOrder")


const PORT = process.env.PORT || 8080
const server = express()
server.use(express.json())
server.use(cors())
mongoose.set('strictQuery', true);
server.get("/", async (req, res) => {
    res.send("welcome to my server")
})
server.use("/add-user", addUser)
server.use("/login-user", loginUser)
server.use("/add-order", postorder)
server.use("/get-order", getorder)

server.listen(PORT, async () => {
    await connect()
    console.log(`Server listening in the port no ${PORT}`)
})