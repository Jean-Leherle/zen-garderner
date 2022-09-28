const jwt = require('jsonwebtoken');

const env = require('../config/env.js');
const passwordHashing = require("../utils/passwordHashing");
const userModel = require('../model/userModel');

const sessionController = {
    login: async (request, response) => {
        const { email, password } = request.body;

        // Checking if user exists by email
        const user = await userModel.findByEmail(email);
        if (!user) {
            response.sendStatus(401);
            return;
        }

        // Checking user password
        try {
            const passwordIsValid = await passwordHashing.verify(password, user.password);
            if (passwordIsValid) {
              // Password & email are valid => Generate JWT token

              // Delete password hash to prevent sending it to client
              delete user.password;

              // Preparing JWT payload with user ID
              const payload = {
                user_id: user.id,
              };

              // Sign JWT token
              const jwtToken = jwt.sign(payload, env.getJwtSecret());

              // Sending token and user data as response
              response.json({
                token: jwtToken,
                userData: user,
              });
            } else {
              // Password & email are not valid
              response.sendStatus(401);
            }
        } catch(error) {
            console.error(error);
            response.sendStatus(500);
        }
    },

    logout: (request, response) => {
      response.sendStatus(200);
    },
}

module.exports = sessionController;