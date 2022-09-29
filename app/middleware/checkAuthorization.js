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

    console.log('token', token);
    // Check token is valid
   
    try {
        const decodedToken = jwt.verify(token, env.getJwtSecret());
        console.log('decodedToken', decodedToken);
        if (!decodedToken) {
            return response.sendStatus(401);
        }
    
        request.decodedToken = decodedToken;
        next();
    }catch(error){
        return response.sendStatus(498);
    }
    
};

module.exports = checkAuthorization;