const env = require("../config/env.js");
const tasksModel = require("../model/tasksModel");

const tasksController = {
  /**
   * GET /tasks/
   * @summary get all task from the user asking
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - succes response example
   * [
  {
    "id": "1",
    "label": "arrosage carotte",
    "begin_date": "2023-06-05T22:00:00.000Z",
    "limit_date": "2023-06-06T22:00:00.000Z",
    "user_id": 1,
    "sheet_id": 1
  },
  {
    "id": "4",
    "label": "couper la haie",
    "begin_date": "2022-10-03T22:00:00.000Z",
    "limit_date": "2022-10-09T22:00:00.000Z",
    "user_id": 1,
    "sheet_id": null
  }
]
   * @returns {object} 204 - response empty of content - application/json
   
  */
  getAll: async (request, response) => {
    const userId = request.decodedToken.user_id;
    let result
    try{
      result = await tasksModel.findByUserId(userId)
    }catch(error){
      console.log(error);
      response.status(500).send(error)
      return
    }
    if (!result) {
      response.sendStatus(204)
      return
    }


    response.status(201).json(result)
  },

  postNewTasks: async (request, response) => {
    const userId = request.decodedToken.user_id;
    //const tasks = request.body.tasks
    /* const tasks = {
      label: "recolte des carottes",
      begin_date: "2022-10-05T22:00:00.000Z",
      limit_date: "2022-11-06T22:00:00.000Z",
      sheet_id: null
    } */
    const tasks= request.body

    let result
    try{
      result = await tasksModel.addTasks(userId, tasks)
    }catch(error){
      console.log(error);
      response.status(500).send(error)
      return
    }
    if (!result){
      response.sendStatus(404)
      return
    }
    response.status(201).json(result)

  }
  //renvoyer tout dont cheats_id 
};

module.exports = tasksController


