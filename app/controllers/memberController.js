const env = require("../config/env.js");
const passwordHashing = require("../utils/passwordHashing");
const memberModel = require("../model/memberModel");
const { memberSchemaRegister, memberSchemaUpdate } = require("../validation/memberSchema.js");

 /**
   * POST /member/
   * @summary allow to register a new member
   * @param {object} request.body.required email and password 
   * @example request - example
   * {email : bob@bob.bob, password : 1234}
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success reponse example 
   * [
   *   {
   *    "token" : "cryptedtoken link to the user log",
   * "userData": {"id": "1","pseudo": "bob","email": "bob@bob.bob", "adress": null, "zip_code": null, "city": null, "phone": null, "task_notification": true, "week_notification": false
   *   }}
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
    const {error} = await memberSchemaRegister.validate(request.body);
    
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
            response.json(insertionUser);
        } catch (err) {
                console.error(err);
                response.sendStatus(500);
            }
        } else {
          response.status(401).send(error.details[0].message).send(errorDb);
      };
    }, 

     /**
   * GET /member/
   * @summary allow to get the profile of member connected
   * @param {object} request.decodedToken.user_id
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success reponse example 
   *  
   * {"pseudo": "bob","email": "bob@bob.bob", "adress": null, "zip_code": null, "city": null, "phone": null, "task_notification": true, "week_notification": false
   *   }
   */
    getProfile: async (request, response) => {
      // find the user with the token 
      const user_id = request.decodedToken.user_id;

      //find the informations of the user connected 
      const user = await memberModel.findById(user_id);
     
     //if the user exist in th db send the user data, if isn't the db satus 401
      if(user) {
        response.send(user);
       } else {
        response.sendStatus(401);
       }
    },
/**
   * POST /member/
   * @summary allow to the member to update her profile 
   * @param {object} request.body.required email and password
   * @param {object} request.decodedToken.user_id
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success reponse example 
   *  
   * {"pseudo": "bob","email": "bob@bob.bob", "adress": null, "zip_code": null, "city": null, "phone": null, "task_notification": true, "week_notification": false
   *   }
   */
  updateProfile: async (request, response) => {
    const user_id = request.decodedToken.user_id;
    const {
      pseudo,
      email,
      address,
      zip_code ,
      city,
      phone,
      task_notification,
      week_notification,
      id
    } = request.body;
    
    //find the user connected and get all of her informations 
    const user = await memberModel.findById(user_id);
    
    // use the schema create with Joi to verificate the updated data
    const {error} = memberSchemaUpdate.validate(request.body);
    if(error){
      response.send(error.details[0].message);
    }
  
    // if the user exist and, the data are validated, the data from the member are updated 
    if(user) {
      const userUpdate = await memberModel.updateUser(
           pseudo,
           email,
           address,
           zip_code ,
           city,
           phone,
           task_notification,
           week_notification,
           id);
      response.send(userUpdate);
    } else {
      response.status(401);
    };
  }

};

module.exports = memberController;