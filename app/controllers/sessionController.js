const jwt = require('jsonwebtoken');

const env = require('../config/env.js');
const passwordHashing = require("../utils/passwordHashing");
const memberModel = require('../model/memberModel');

const sessionController = {
  /**
   * POST /session/
   * @summary allow to login
   * @param {object} request.body.required email and password 
   * @example request - example 
   * {email : bob@bob.bob, password : 1234}
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success reponse example 
   * [
   *   {
   * "userData": {"id": "1","pseudo": "bob","email": "bob@bob.bob", "address": null, "zip_code": null, "city": null, "phone": null, "task_notification": true, "week_notification": false}
   *   }
   * ]
   */
  login: async (request, response) => {
    const { email, password } = request.body;

    // Checking if user exists by email
    const user = await memberModel.findByEmail(email);
    if (!user) {
      return response.status(401).send('email not found');
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
        const jwtToken = jwt.sign(payload, `${env.getJwtSecret()}`);

        // Setting session cookie with token
        request.session.token = jwtToken;

        // Sending user data as response
        response.json({
          userData: user,
          jwtToken: jwtToken,
        });
      } else {
        // Password & email are not valid
        response.status(401).send('password invalid');
      }
    } catch (error) {
      console.error('login error',error);
      response.sendStatus(500);
    }
  },
  /**
   * DELETE /session/
   * @summary allow to logout
   * @param {object} request.body header session's token
   * @example request - example
   * {Authorization : Bearer cryptedToken}
   * @param {object} response Express response object
   * @returns  200 - success response
   */
  logout: (request, response) => {
    request.session.destroy();
    response.sendStatus(200);
  },
}

module.exports = sessionController;