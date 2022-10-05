const { request, response } = require("express");
const env = require("../config/env.js");
const sheetsModel = require("../model/sheetsModel");
const actionModel = require("../model/actionModel")

const sheetsController = {
  /**
   * GET /sheets/
   * @summary get all sheets
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
	  {
      "id": 1,
      "title": "carotte orange",
      "photo": "carotte_orange.png",
      "description": "lorem ipsum",
      "caracteristique": "lorem ipsum",
      "categories.id": [
        "2",
        "5"
      ],
		"categories.label": [
			"légumes",
			"facile"
		  ]
	  },
	  {
      "id": 2,
      "title": "courgette",
      "photo": "courgette.png",
      "description": "lorem ipsum",
      "caracteristique": "lorem ipsum",
      "categories.id": [
        "2"
        ],
      "categories.label": [
        "légumes"
        ]
	  }
    ]
   * @returns {object} 204 - response empty of content - application/json
*/  
getAll: async (request, response) => {

    const { p, n } = request.query;
    let result;
    try {
      if (isNaN(p) || isNaN(n)) { //if this query is not complete (or not a number) we assign default value and suppose number of sheet <100
        result = await sheetsModel.findAllSheets(0, 100);
      }
      result = await sheetsModel.findAllSheets(p, n);
      if (!result) {
        return response.status(204).send('no result found');
      }
      response.status(200).json(result);

    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  },

   /**
   * GET /sheets/:sheetsId
   * @summary get one sheet 
   * @param {object} response Express response object contain task as json - x-www-form-urlencoded
   * @param {object} request.params Express request params
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
      {
        "id": 2,
        "title": "courgette",
        "photo": "courgette.png",
        "description": "lorem ipsum",
        "caracteristique": "lorem ipsum",
        "categories.id": [
          "2"
        ],
        "categories.label": [
          "légumes"
        ]
      }
    ]
  *
  */
  getOneSheet: async (request, response) => {
    // fin the right sheet with the id param
    const sheetsId = parseInt(request.params.sheetsId);
    if(isNaN(sheetsId)) { 
      return response.sendStatus(400);
    }
    try {
      let result = await sheetsModel.findOneSheet(sheetsId);
      const resultAction = await actionModel.findAllAction(sheetsId);
      if(!result) {
        return response.status(204).send("no sheet found");
      }
      result = { sheet: result, actions : resultAction}
      response.status(200).json(result);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
    
  },

  /**
   * GET /sheets/:sheetsId/action
   * @summary get all action from one sheet 
   * @param {object} response Express response object 
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
      {
        "id": 1,
        "label": "arroser",
        "month_begin": 6,
        "month_limit": 8,
        "sheet_id": 1
      },
      {
        "id": 3,
        "label": "recolter",
        "month_begin": 8,
        "month_limit": 10,
        "sheet_id": 1
      }
    ]
  *
  */
  getActionFromSheet: async (request, response) =>{
    const sheetsId = request.params.sheetsId;
    if(isNaN(sheetsId)){
      return response.sendStatus(400)
    };
    try {
      const result = await actionModel.findAllAction(sheetsId);
      if (!result){
        return response.status(204).send("no action associated to this sheet found")
      }
      response.status(200).json(result)
    } catch (error) {
      response.status(500).send(error);
    }
  }
}
module.exports = sheetsController