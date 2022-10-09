// data verification send by a new visitor to want to register and an member who wants to update their data
const Joi = require('joi');


// creating a schema to validate the data's values for the registration of an new user
const month= Joi.number().integer().max(12).positive();

const actionSchema = Joi.object({
  label: Joi.string(),
  month_begin : month,
  month_begin : month,
  
});

const sheetSchema = Joi.object({
    title: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    catacteristique: Joi.string().required(),
    categories:Joi.array().items(Joi.object({
      label:Joi.string()
    })).allow(null),
    actions : Joi.array().items(actionSchema).allow(null)
});


module.exports = {sheetSchema};