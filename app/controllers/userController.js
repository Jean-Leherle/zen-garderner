const env = require("../config/env.js");
const passwordHashing = require("../utils/passwordHashing");
const userModel = require("../model/userModel");

const userController = {
  register: async (request, response) => {
    const data = request.body;

//Verification of information written by the member

    let error = "";
    if (!data.password) {
      error = "Le mot de passe est obligatoire";
    };

    if (data.password !== data.passwordConfirm) {
      error = "Le mot de passe ne correspond pas";
    };
    
    if (data.password.length < 8) {
      error = "Le mot de passe est trop court";
    };
    
    if (!data.email) {
      error = "L'email est obligatoire";
    };

    if (isNaN(data.zip_code) == false && data.zip_code.length < 6 || data.zip_code.length > 6){
        error = "Le code postal doit être composé de 6 chiffres";
    };

    // Checking if the member is not already registered

    //  if the member is not registered, it is inserted in db

    // 

  },
};

module.exports = userController;
