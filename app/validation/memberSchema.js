// data verification send by a new visitor to want to register and an member who wants to update their data
const Joi = require('joi');

// variables for the different regex :  email, phone and zip_code
const regexEmail = '^[a-zA-Z0-9_.-]+@([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]{2,4}$';
const regexZipCode= '^[0-9]{5}$';
const regexPhone= '^([+]33\\s?|0)\\d((\\s|\\.|\\-|\\_|)?\\d{2}){3}(\\3[0-9]{2})$';



// creating a schema to validate the data's values for the registration of an new user
const memberSchemaRegister = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().regex(new RegExp(regexEmail)).required(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password'),
    address: Joi.string().allow(null,''),
    zip_code: Joi.string().pattern(new RegExp(regexZipCode)).allow(null,''),
    city: Joi.string().allow(null,''),
    phone: Joi.string().pattern(new RegExp(regexPhone)).allow(null,''),
    task_notification: Joi.boolean().required(),
    week_notification: Joi.boolean().required()
});

// creating a schema to validate the 
const memberSchemaUpdate = Joi.object({
    pseudo: Joi.string().required(),
    email: Joi.string().regex(new RegExp(regexEmail)).required(),
    address: Joi.string().allow(null,''),
    zip_code: Joi.string().pattern(new RegExp(regexZipCode)).allow(null,''),
    city: Joi.string().allow(null,''),
    phone: Joi.string().pattern(new RegExp(regexPhone)).allow(null,''),
    task_notification: Joi.boolean().required(),
    week_notification: Joi.boolean().required()
}); 

module.exports = {memberSchemaRegister, memberSchemaUpdate};