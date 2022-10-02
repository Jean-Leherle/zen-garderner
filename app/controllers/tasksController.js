const env = require("../config/env.js");
const tasksModel = require("../model/tasksModel");

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
      response.sendStatus(204)
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
    //const tasks = request.body.tasks
    /* const tasks = {
      label: "recolte des carottes",
      begin_date: "2022-10-05T22:00:00.000Z",
      limit_date: "2022-11-06T22:00:00.000Z",
      sheet_id: null
    } */
    const tasks = request.body
    const error = []
    if (!tasks.label || tasks.label === '') {
      error.push('error : label null or empty')
    }

    if (!tasks.begin_date || isNaN(Date.parse(tasks.begin_date))) {
      error.push('error : begin_date is null or not readable')
    };
    if (Date.parse(tasks.begin_date) < Date.now()) {
      error.push('error : begin_date already passed')
    };
    if (!tasks.limit_date || isNaN(Date.parse(tasks.limit_date))) {
      error.push('error : limit_date is null or not readable')
    };
    if (Date.parse(tasks.limit_date) < Date.now()) {
      error.push('error : limit_date already passed')
    };
    if (Date.parse(tasks.limit_date) < Date.parse(tasks.begin_date)) {
      error.push("error : time machine still doesn't exist, limit_date is before begin_date ")
    };

    //todo ajouter le controle de la fiche quand la fonction sera prete

    if (error.length > 0) {
      response.status(400).send(error)
      return
    }
    let result
    try {
      result = await tasksModel.addTasks(userId, tasks)
    } catch (error) {
      console.log(error);
      response.status(500).send(error)
      return
    }
    if (!result) {
      response.status(404).send("user not found");
      return
    }
    response.status(201).json(result)
  },
  deleteTasks: async (request, response)=>{
    const userId = request.decodedToken.user_id;
    const tasksId = request.params.id;

  }



};

module.exports = tasksController


