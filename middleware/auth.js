const jwt = require('jsonwebtoken')

module.exports = Auth = (req, res, next)=> {
    const authHeader = req.headers.authorization

    if(authHeader){
        let token = authHeader.split(' ')[1]

        let verified = jwt.verify(token, process.env.TOKEN)
        if(!verified) return res.send("Unauthorized request")

        res.user = verified
        next()
    }
    else{
        return res.json({
            message: "Unauthorized",
        })
    }
}