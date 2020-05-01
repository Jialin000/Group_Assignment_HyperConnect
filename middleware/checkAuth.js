const jwt = require('jsonwebtoken')

// Middleware for jwt token verification
module.exports = (req, res, next) => {
    try {

        // Get the token from Authorization header of HTTP request, and verify it
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        // If verification succeeds, populate req with decoded user information
        req.userData = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            message: 'Authentication failed.'
        })
    }
}