const jwt = require('jsonwebtoken');

const env = require('../config/env.js');

/** Checks authorization token (JWT) from Authorization header */
const checkAuthorization = async (request, response, next) => {
    let token = request.headers.authorization;

    // Checking token has been sent in headers
    if (!token) {
        return response.sendStatus(401);
    }

    // Checking bearer and removing
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        if (!token || token === '') {
            return response.sendStatus(401);
        }
    }

    // Check token is valid
    const decodedToken = jwt.verify(token, env.getJwtSecret());

    if (!decodedToken) {
        return response.sendStatus(401);
    }

    request.decodedToken = decodedToken;
    next();
};

module.exports = checkAuthorization;