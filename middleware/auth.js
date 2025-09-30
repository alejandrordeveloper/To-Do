const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userExtractor = async (req, res, next) => {
    try {
        // Cookie name must match the name used when setting it (accessToken)
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.sendStatus(401);
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decoded.id);
        if (!user) return res.sendStatus(401);
        req.user = user;
    } catch (error) {
        return res.sendStatus(403);
    }
    next();
};

module.exports = { userExtractor };