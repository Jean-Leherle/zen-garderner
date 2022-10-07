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
      "description": "lorem ipsum",
      "photo": "carotte_orange.png",
      "caracteristique": "lorem ipsum",
      "categories": [
        {
          "id": 2,
          "label": "légumes"
        },
        {
          "id": 5,
          "label": "facile"
        }
      ],
      "actions": [
        {
          "id": 1,
          "label": "arroser"
        },
        {
          "id": 3,
          "label": "recolter"
        }
      ]
    },
    {
      "id": 2,
      "title": "courgette",
      "description": "lorem ipsum",
      "photo": "courgette.png",
      "caracteristique": "lorem ipsum",
      "categories": [
        {
          "id": 2,
          "label": "légumes"
        }
      ],
      "actions": [
        {
          "id": 2,
          "label": "déserber"
        }
      ]
    }
  ]
   * @returns {object} 204 - response empty of content - application/json
*/  
getAll: async (request, response) => {

    const {q ,p ,n } = request.query;
    const regex= /^[\dA-zÀ-ú\s]*$/
    let result;
    try {
      if (isNaN(p) || isNaN(n)) { //if this query is not complete (or not a number) we assign default value and suppose number of sheet <100
        result = await sheetsModel.findAllSheets(1, 100);
      }
      if(!regex.test(q)){
        response.status(400).send("bad query, please dont use special charactere")
      }
      result = await sheetsModel.findAllSheets(q||'', p||1, n||100);
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
        "description": "lorem ipsum",
        "photo": "courgette.png",
        "caracteristique": "lorem ipsum",
        "categories": [
          {
            "id": 2,
            "label": "légumes"
          }
        ],
        "actions": [
          {
            "id": 2,
            "label": "déserber"
          }
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
      if(!result) {
        return response.status(204).send("no sheet found");
      }
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
        "actions": [
          {
            "id": 2,
            "label": "déserber"
          }
        ]
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