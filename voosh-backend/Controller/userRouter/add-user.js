const express = require("express")
const User = require("../../Modal/userModel")
const bcrypt = require("bcrypt")
const addUser = express.Router()


addUser.post("/", async (req, res) => {
    console.log(req.body)
    const { name, phone_number, password } = req.body
    try {
        const existing_user = await User.findOne({ phone_number })
        if (existing_user) {
            return res.status(403).send({ message: "User is already exist in our Database" })
        }
        bcrypt.hash(password, 8, async (err, hashed) => {
            if (err) return res.status(500).send("we are facing some internal problem! Please try after some time")
            const create_newUser = await User.create({
                name: name,
                phone_number: phone_number,
                password: hashed
            })
            return res.status(200).send({ message: "Account created successfully", user: create_newUser })
        })

    } catch (e) {
        return res.status(500).send({ message: e })
    }
})
module.exports = addUser
