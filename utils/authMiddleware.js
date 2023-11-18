const session = require("express-session");

const authMiddleware = (req, res, next) => {
    console.log('Patryk', req.session);
    if (req.session.user) {
        next();
    } else {
        res.status(400).send({ message: 'You are not authorized'});
    }
};

module.exports = authMiddleware;