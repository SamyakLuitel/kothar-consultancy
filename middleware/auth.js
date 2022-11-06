const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = "secret";


function AuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    // format Bearer TOKEN

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user)
        req.user = user
        next()
    })
}


module.export = AuthenticateToken;
