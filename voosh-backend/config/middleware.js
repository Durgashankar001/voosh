const jwt  = require("jsonwebtoken")
const middleware = (req,res,next) => {
    const authHeader = req.headers["x-authorization"]
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,"vooshwebtoken",(err,user)=>{
            if(err) return res.status(403).send("Token is not valid")
            req.user = user
            next()
        })
    }else{
        res.status(401).send("You are not authonticated")
    }
}

module.exports = middleware