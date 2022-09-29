const env = require('../config/env.js');
const passwordHashing = require("../utils/passwordHashing");
const userModel = require('../model/userModel');



const userController = {
    register: async (request, response) => {
        const data = request.body;

         let error = '';
            if (!data.password) {
                error = 'Le mot de passe est obligatoire '
            }
            if (data.password !== data.passwordConfirm) {
                error = 'Le mot de passe ne correspond pas';
            }
        else if (data.password.length < 8) {
            error = 'Le mot de passe est trop court';
        } else if (!data.email) {
            error = 'Email obligatoire';
        }
    }
};

module.exports = userController;