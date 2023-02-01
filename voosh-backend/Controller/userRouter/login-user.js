const express = require("express")
const User = require("../../Modal/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginUser = express.Router()


loginUser.post("/", async (req, res) => {
    const { phone_number, password } = req.body
    try {
        const user = await User.findOne({ phone_number })
        if (!user) {
            return res.status(401).send({ message: "No account registered with this Phone Number" })
        }

        bcrypt.compare(password, user.password, async (err, compared) => {
            if (compared) {
                const token = jwt.sign(
                    {
                        id: user._id, name: user.name
                    }, "vooshwebtoken",
                    {
                        expiresIn: "10 day"
                    }
                )
                const response = {
                    message: "login successfull",
                    token: token,
                }
                return res.status(200).send(response)
            }
            return res.status(403).send("Wrong credential")
        })


    } catch (e) {
        return res.status(500).send({ message: "Something went worng please try after sometimes", e })
    }
})
module.exports = loginUser
