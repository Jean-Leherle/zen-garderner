const { request, response } = require("express");
const env = require("../config/env.js");
const sheetsModel = require("../model/sheetsModel");

const sheetsController = {
  getAll: async (request, response)=>{
    //get token
    const {q,p,n} = request.query;
    const result = sheetsModel.findAllSheets(q,p,n)
    response.send(pagination)
  }
}
module.exports = sheetsController