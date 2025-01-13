const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log("working");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            console.log(decoded) //invalid token
            req.user = decoded;
            req.roles = decoded.role;
            next();
        }
    );
}

module.exports = verifyJWT