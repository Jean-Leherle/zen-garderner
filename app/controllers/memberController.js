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
  * {
    * pseudo: bob, 
    * email : bob@bob.bob, 
    * password : 1234, 
    * repeat_password: 1234, 
    * address: 5 rue de paris, 
    * zip_code: 26666, 
    * city: paris, 
    * phone:06-06-06-06-06, 
    * task_notification: true, 
    * week_notification: true 
    * }
  * @param {object} response Express response object 
  * @returns {object} 200 - success response - application/json
  * @example response - 200 - success reponse example 
  *   [
  * {
  *     "pseudo": "bob",
  *     "email": "bob@bob.bob", 
  *     "adress": "5 rue de paris", 
  *     "zip_code": "26666", 
  *     "city": "paris", 
  *     "phone": "06-06-06-06-06", 
  *     "task_notification": true, 
  *     "week_notification": true
  *   }
  * ]
  */

const memberController = {
  register: async (request, response) => {
    let user = request.body

    for (const property in user) {
      user[property] = user[property]!=='' ? user[property] : null
    }

    let errorDb = []


    // check if pseudo is unique
    //all actual information about user
    let pseudoUnique //try to find user with same pseudo
    let emailUnique // try to find user with same email
    try {
      if (!user || !user.pseudo || !user.email) {
        errorDb.push("Body vide ou sans pseudo ou mail")
      }
      else {
        pseudoUnique = await memberModel.findByPseudo(user.pseudo);
        emailUnique = await memberModel.findByEmail(user.email.toLowerCase());
      }
    } catch (err) {
      console.log(err);
      return response.status(500).send(err)
    }

    if (pseudoUnique && pseudoUnique.pseudo === user.pseudo) {
      errorDb.push("Pseudo déjà utilisé")
    }

    if (emailUnique && emailUnique.email === user.email.toLowerCase()) {
      errorDb.push("Email déjà utilisé");
    }
    //console.log(errorDb);
    // use the schema create with Joi to verificate the updated data
    const { error } = await memberSchemaRegister.validate(user);
    if (error) {
      errorDb.push(error.details[0].message)
    }
    if (errorDb.length >= 1) {
      return response.status(400).send(errorDb)
    }
    //  if the member is not registered, it is inserted in db
    const hashedPassword = await passwordHashing.hash(user.password);
    user = { ...user, pseudo: user.pseudo, email: user.email.toLowerCase(), password: hashedPassword }
    try {
      const insertionUser = await memberModel.insertUser(user);
      return response.status(201).json(insertionUser);
    } catch (err) {
      console.error(err);
      return response.sendStatus(500);
    }
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
*    "pseudo": "bob",
    "email": "bob@bob.bob", 
    "adress": "5 rue de paris", 
    "zip_code": "26666", 
    "city": "paris", 
    "phone": "06-06-06-06-06", 
    "task_notification": true, 
    "week_notification": true
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
      delete user.password
      response.status(200).send(user);
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
     *    "pseudo": "bob",
     *    "email": "bob@bob.bob", 
     *    "adress": "5 rue de paris", 
     *    "zip_code": "26666", 
     *    "city": "paris", 
     *    "phone": "06-06-06-06-06", 
     *    "task_notification": true, 
     *    "week_notification": true
     *   }
     * ]
     */
  updateProfile: async (request, response) => {
    const user_id = request.decodedToken.user_id;
    if (isNaN(parseInt(user_id))) {
      return response.sendStatus(400);
    }
    user = request.body

    for (const property in user) {
      user[property] = user[property]!=='' ? user[property] : null
    }
    
    let errorDb = [];
    //console.log(user, user.task_notification, typeof(user.task_notification));

    let userConnected //all actual information about user
    let pseudoUnique //try to find user with same pseudo
    let emailUnique // try to find user with same email
    try {
      if (!user || !user.pseudo || !user.email) {
        errorDb.push("Body vide ou sans pseudo ou mail")
      }
      else {
        pseudoUnique = await memberModel.findByPseudo(user.pseudo);
        emailUnique = await memberModel.findByEmail(user.email.toLowerCase());
      }

      userConnected = await memberModel.findById(user_id);

      pseudoUnique = await memberModel.findByPseudo(user.pseudo);
      emailUnique = await memberModel.findByEmail(user.email.toLowerCase());

    } catch (err) {
      console.log(err);
      return response.status(500).send(err)
    }

    if (pseudoUnique && pseudoUnique.pseudo !== userConnected.pseudo) {
      errorDb.push("Pseudo déjà utilisé")

    }
    if (emailUnique && emailUnique.email !== userConnected.email.toLowerCase()) {
      errorDb.push("Email déjà utilisé");
    }
    // use the schema create with Joi to verificate the updated data
    const { error } = await memberSchemaUpdate.validate(user);
    if (error) {
      errorDb.push(error.details[0].message)
    }
    if (errorDb.length >= 1) {
      return response.status(400).send(errorDb)
    }
    user = { ...user, pseudo: user.pseudo, email: user.email.toLowerCase(), id: user_id }

    // if the user exist and, the data are validated, the data from the member are updated 
    try {
      if (user) {
        const userUpdate = await memberModel.updateUser(user);
        response.status(200).send(userUpdate);
      } else {
        response.sendStatus(400);
      };
    }
    catch (error) {
      console.log(error);
      response.status(500).send(error)
    }
  }

};

module.exports = memberController;
