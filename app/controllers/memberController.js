const env = require("../config/env.js");
const passwordHashing = require("../utils/passwordHashing");
const memberModel = require("../model/memberModel");
const { memberSchemaRegister, memberSchemaUpdate } = require("../validation/memberSchema.js");

/**
  * POST /member/
  * @summary allow to register a new member
  * @param {object} request.body.required email, password, repeat_password, task_notification, week_notification
  * @param {object} request.body Express request object contain task as json pseudo, email, password, repeat_password, address, zip_code, city, phone, task_notification, week_notification - x-www-form-urlencoded
  * @example request - example
  * {pseudo: bob, email : bob@bob.bob, password : 1234, repeat_password: 1234, address: 5 rue de paris, zip_code: 26666, city: paris, phone:06-06-06-06-06, task_notification: true, week_notification: true }
  * @param {object} response Express response object 
  * @returns {object} 200 - success response - application/json
  * @example response - 200 - success reponse example 
  *   [
  * {
  *    "pseudo": "bob","email": "bob@bob.bob", "adress": "5 rue de paris", "zip_code": "26666", "city": "paris", "phone": "06-06-06-06-06", "task_notification": true, "week_notification": true
  *   }
  * ]
  */

const memberController = {
  register: async (request, response) => {
    const {
      pseudo,
      email,
      password,
      repeat_password,
      address,
      zip_code,
      city,
      phone,
      task_notification,
      week_notification,
    } = request.body;

    // use the schema create with Joi to verificate the data send by the new user 
    const { error } = await memberSchemaRegister.validate(request.body);

    // check if pseudo is unique
    let errorDb = ""
    const pseudoUnique = await memberModel.findByPseudo(pseudo);
    if (pseudoUnique) {
      errorDb += "Pseudo déjà utilisé // "
    }

    // Checking if the member is not already registered
    const resultUser = await memberModel.findByEmail(email);
    if (resultUser) {
      errorDb += "Email déjà utilisé";
    }

    //  if the member is not registered, it is inserted in db
    if (!error && !errorDb) {
      const hashedPassword = await passwordHashing.hash(password);
      try {
        const insertionUser = await memberModel.insertUser(
          pseudo,
          email,
          hashedPassword,
          address,
          zip_code,
          city,
          phone,
          task_notification,
          week_notification,
        );
        return response.status(201).json(insertionUser);

      } catch (err) {
        console.error(err);
        return response.sendStatus(500);
      }
    } else {
      return response.status(400).send(error.details[0].message + '\n' + errorDb);
    };
  },

  /**
* GET /member/
* @summary allow to get the profile of member connected
* @param {object} request.decodedToken.user_id user_id
* @param {object} response Express response object 
* @returns {object} 401 - unauthorized - no user found
* @returns {object} 200 - success response - application/json
* @example response - 200 - success reponse example 
*   [
* {
*    "pseudo": "bob","email": "bob@bob.bob", "adress": "5 rue de paris", "zip_code": "26666", "city": "paris", "phone": "06-06-06-06-06", "task_notification": true, "week_notification": true
*   }
* ]
*/
  getProfile: async (request, response) => {
    // find the user with the token 
    const user_id = request.decodedToken.user_id;

    //find the informations of the user connected 
    const user = await memberModel.findById(user_id);

    //if the user exist in th db send the user data, if isn't the db satus 401
    if (user) {
      response.send(user);
    } else {
      response.sendStatus(400);
    }
  },
  /**
     * PATCH /member/
     * @summary allow to the member to update her profile 
     * @param {object} request.decodedToken.user_id user_id 
     * @param {object} request.body.required email, task_notification, week_notification, id
     * @param {object} request.body Express request object contain task as json pseudo, email, address, zip_code, city, phone, task_notification, week_notification, id - x-www-form-urlencoded
     * @param {object} response Express response object 
     * @returns {object} 200 - success response - application/json
     * @example response - 200 - success reponse example 
     *   [
     * {
     *    "pseudo": "bob","email": "bob@bob.bob", "adress": "5 rue de paris", "zip_code": "26666", "city": "paris", "phone": "06-06-06-06-06", "task_notification": true, "week_notification": true
     *   }
     * ]
     */
  updateProfile: async (request, response) => {
    const user_id = request.decodedToken.user_id;
    const {
      pseudo,
      email,
      address,
      zip_code,
      city,
      phone,
      task_notification,
      week_notification,
      id = user_id
    } = request.body;

    //find the user connected and get all of her informations 
    let user
    try {
      user = await memberModel.findById(user_id);
      
    } catch (error) {
      return response.sendStatus(500)
    }

    // use the schema create with Joi to verificate the updated data
    const { error } = memberSchemaUpdate.validate(request.body);
    if (error) {
      return response.status(400).send(error.details[0].message);
    }
    // if the user exist and, the data are validated, the data from the member are updated 
    try {
      if (user) {
        const userUpdate = await memberModel.updateUser(
          pseudo,
          email,
          address,
          zip_code,
          city,
          phone,
          task_notification,
          week_notification,
          id);
        response.send(userUpdate);
      } else {
        response.status(400);
      };
    }
    catch (error) {
      response.sendStatus(500)
    }
  }

};

module.exports = memberController;