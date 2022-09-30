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
    const tasksList = await tasksModel.findByUserId(userId)
    if (!tasksList){
      response.sendStatus(204)
      return
    }
    

    response.status(201).json(tasksList)
  },

  postNewTask:()=>{

  }
  //renvoyer tout dont cheats_id 
};

module.exports = tasksController


