const env = require("../config/env.js");
const passwordHashing = require("../utils/passwordHashing");
const memberModel = require("../model/memberModel");
const sessionController = require("./sessionController.js");
const { updateUser } = require("../model/memberModel");

const memberController = {
  register: async (request, response) => {
    // TODO : Using joi ? https://joi.dev/api/?v=17.6.1
    const {
      pseudo,
      email,
      password,
      address,
      zip_code ,
      city,
      phone,
      task_notification,
      week_notification,
    } = request.body;

    // Verification of information written by the member : password, email

    let error = "";
    if (!password) {
      error += "Le mot de passe est obligatoire";
    }
    if (password.length < 8) {
      error += "Le mot de passe est trop court";
    }
    if (!email) {
      error += "L'email est obligatoire";
    }

    // check email is an email using regex
    const emailRegex = ~'^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$'
    if(email ==! emailRegex) {
        error += "L'email n'est pas un email"
    }
    
    // check if pseudo is unique

    const pseudoUnique = await memberModel.findByPseudo(pseudo);
    if (pseudoUnique) {
        error += "Pseudo déjà utilisé"
    }

    // Checking if the member is not already registered
    const resultUser = await memberModel.findByEmail(email);
    if (resultUser) {
        error += "Email déjà utilisé";
    }
  
    //  if the member is not registered, it is inserted in db
    if (!error) {
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
            response.status(201).json(insertionUser);
        } catch (err) {
                console.error(err);
                response.sendStatus(500);
            }
        } else {
          response.sendStatus(404);
          response.json(error);
        };
    }, 

    getProfile: async (request, response) => {
      //
      const user_id = request.decodedToken.user_id;

      //find the informations of the user connected 
      
      const user = await memberModel.findById(user_id);
     //console.log(user);
     
     //if the user exist in th db send a status 200, if isn't the db satus 401
      if(user) {
        response.status(201).send(user);
       } else {
        response.sendStatus(401);
       }
    },

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
          
      response.status(201).send({userUpdate});
    } else {
      response.sendStatus(404)
    };
  }

};

module.exports = memberController;