const jwt = require('jsonwebtoken');

const env = require('../config/env.js');

/** Checks authorization token (JWT) from Authorization header */
const checkAuthorization = async (request, response, next) => {
    console.log('checkAuthorization', 'session', request.session);
    console.log('checkAuthorization', 'token', request.session?.token);
    const token = request.session?.token;

    console.log('Headers', request.get("Authorization"))


    // Check token has been sent
    if (!token) {
        console.log('token is missing');
        return response.sendStatus(401);
    }

    // Check token is valid
    try {
        const decodedToken = jwt.verify(token, env.getJwtSecret());

        // Token is valid => storing decodedToken in request to access user ID in controllers
        // From a controller : request.decodedToken.user_id
        request.decodedToken = decodedToken;
        next();
    } catch (error) {
        // Token is expired, invalid
        console.log(error);
        return response.sendStatus(401); // HTTP 498 is an nginx reserved code, not standard
    }
};

module.exports = checkAuthorization;