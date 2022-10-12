const { request } = require("express");
const env = require("../config/env.js");
const tasksModel = require("../model/tasksModel");
const {taskSchema} = require ("../validation/taskSchema")
const sheetModel = require("../model/sheetsModel")

const tasksController = {
  /**
   * GET /tasks/
   * @summary get all task from the user connected
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
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
    try {
      result = await tasksModel.findByUserId(userId)
    } catch (error) {
      console.log(error);
      response.status(500).send(error)
      return
    }
    if (!result) {
      response.sendStatus(204).send([])
      return
    }


    response.status(200).json(result)
  },

  /**
     * POST /tasks/
     * @summary create new task to the user connected
     * @param {object} request Express request object contain task as json
     * @param {object} response Express response object contain task as json
     * @example request - example
     * [
        {
        label: "recolte des carottes",
        begin_date: "2022-10-05T22:00:00.000Z",
        limit_date: "2022-11-06T22:00:00.000Z",
        sheet_id: 1
        } 
      ]
     * @returns {object} 201 - success response - application/json
     * @example response - 201 - success response example
     * [
    {
      "id": "1",
      "label": "recolte des carottes",
      "begin_date": "2022-10-05T22:00:00.000Z",
      "limit_date": "2022-11-06T22:00:00.000Z",
      "user_id": 1,
      "sheet_id": 1
    }
    
  ]
     * @returns {object} 400 - request contains wrong data - application/json
     * @example response - 400 - bad request response example
     * [
    "error : first error explain",
    "error : second error explain "
      ]
     * @returns {object} 404 - user_id is empty or already change - application/json
     * @example response - 404 - bad request response example
     * 
     * "user not found"
     * 
    */
  postNewTasks: async (request, response) => {
    const userId = request.decodedToken.user_id;

    const tasks = request.body //todo si bug : mettre [0]

    tasks.begin_date= new Date(tasks.begin_date)
    tasks.limit_date= new Date(tasks.limit_date)

    const errorList = []
    const {error} = await taskSchema.validate(tasks)
    //console.log(error);
    if (error) errorList.push(error.details[0].message)

    if(!error&&tasks.sheet_id){
      const sheet = await sheetModel.findOneSheet(tasks.sheet_id);
      if (!sheet) errorList.push("error : Sheet don't found to this id") 

  
    }

    if (errorList.length > 0) {
      return response.status(400).send(errorList);
    }
    let result
    try {
      result = await tasksModel.addTasks(userId, tasks);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
      
    }
    if (!result) {
      return response.status(404).send("user not found");
      
    }
    response.status(201).json(result);
  },
  /**
   * DELETE /tasks/:tasks_id
   * @summary delete the target task owned by the user connected
   * @param {object} request Express request object contain token
   * @param {object} response Express response object
   * @returns {object} 204 - success response - application/json
   * @returns {object} 400 - bad request response - application/json
   * @example response - 400 - bad request response
   * "task already removed or not found"
   */

  deleteTasks: async (request, response) => {
    const userId = request.decodedToken.user_id;
    const tasksId = request.params.tasksId;
    let result
    try {
      result = await tasksModel.deleteTasks(tasksId, userId);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
      
    }
    if (result === 0) {
      return response.status(400).send('task already removed or not found');
      
    }
    response.sendStatus(204);
  },

  /**
     * PUT /tasks/:tasks_id
     * @summary update the target task owned by the user connected
     * @param {object} request.body Express request object contain task as json - x-www-form-urlencoded
     * @param {object} response Express response object contain task as json
     * @example request - example full
     * [{
        label: "recolte des carottes",
        begin_date: "2022-10-05T22:00:00.000Z",
        limit_date: "2022-11-06T22:00:00.000Z",
        sheet_id: 1
        }] 
      @example request - example without sheet
     * [
        {
        label: "recolte des carottes",
        begin_date: "2022-10-05T22:00:00.000Z",
        limit_date: "2022-11-06T22:00:00.000Z"
        } 
      ]
     * @returns {object} 201 - success response - application/json
     * @example response - 201 - success response example full
     * [
    {
      "id": "1",
      "label": "recolte des carottes",
      "begin_date": "2022-10-05T22:00:00.000Z",
      "limit_date": "2022-11-06T22:00:00.000Z",
      "user_id": 1,
      "sheet_id": 1
    }
  ]
     * @example response - 201 - success response example without sheet
     * [
    {
      "id": "1",
      "label": "recolte des carottes",
      "begin_date": "2022-10-05T22:00:00.000Z",
      "limit_date": "2022-11-06T22:00:00.000Z",
      "user_id": 1,
      "sheet_id": null
    }
  ]
     * @returns {object} 400 - request contains wrong data - application/json
     * @example response - 400 - bad request response example
     * [
    "error : first error explain",
    "error : second error explain "
      ]
     * @returns {object} 404 - user_id is empty or already change - application/json
     * @example response - 404 - bad request response example
     * 
     * "user not found"
     * 
    */

  updateTasks: async (request, response) => {
    const userId = request.decodedToken.user_id;
    const tasksId = request.params.tasksId;
    const tasks = request.body
    const errorList = []
    const {error} = await taskSchema.validate(tasks)
    //console.log(error);
    if (error) errorList.push(error.details[0].message)

    if(!error&&tasks.sheet_id){
      const sheet = await sheetModel.findOneSheet(tasks.sheet_id);
      if (!sheet) errorList.push("error : Sheet don't found to this id") 
    }

    if (errorList.length > 0) {
      return response.status(400).send(errorList);
    }
    let result
    try {
      result = await tasksModel.updateTasks(tasksId, userId, tasks)
    } catch (error) {
      console.log(error);
      response.status(500).send(error)
      return
    };
    if (!result) {
      return response.status(404).send("user not found");
      
    };
    response.status(201).json(result)
  },

  /**
   * GET /tasks/:tasks_id
   * @summary get the target task from the user connected
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
  {
    "id": "1",
    "label": "arrosage carotte",
    "begin_date": "2023-06-05T22:00:00.000Z",
    "limit_date": "2023-06-06T22:00:00.000Z",
    "user_id": 1,
    "sheet_id": 1
  }
]
   * @returns {object} 204 - response empty of content - application/json
  
  */

  getOneTasks: async (request, response)=>{
    const userId = request.decodedToken.user_id;
    const tasksId = request.params.tasksId;
    let result
    try {
      result = await tasksModel.findTasksById(tasksId,userId)
    } catch (error) {
      console.log(error);
      response.status(500).send(error)
      return
    }
    if (!result) {
      response.sendStatus(204)
      return
    }
    response.status(200).json(result)
  }

};

module.exports = tasksController


