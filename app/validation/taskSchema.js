const Joi = require('joi');

const taskSchema = Joi.object({
  label: Joi.string().required(),
  begin_date: Joi.date().greater('now').required(),
  limit_date: Joi.date().min(Joi.ref('begin_date')).required(),
  sheet_id: Joi.number().integer().allow(null)
})

module.exports= {taskSchema}