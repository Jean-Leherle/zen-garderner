const { request, response } = require("express");
const env = require("../config/env.js");
const sheetsModel = require("../model/sheetsModel");
const actionModel = require("../model/actionModel");
const { sheetSchema } = require("../validation/sheetSchema")

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
          "label": "arroser",
          "month_begin": 6,
          "month_limit": 8
        },
        {
          "id": 3,
          "label": "recolter",
          "month_begin": 6,
          "month_limit": 8
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
          "label": "déserber",
          "month_begin": 6,
          "month_limit": 8
        }
      ]
    }
  ]
   * @returns {object} 204 - response empty of content - application/json
*/
  getAll: async (request, response) => {

    const { q, p, n } = request.query;
    const regex = /^[\dA-zÀ-ú\s]*$/
    let result;
    try {
      if (isNaN(p) || isNaN(n)) { //if this query is not complete (or not a number) we assign default value and suppose number of sheet <100
        result = await sheetsModel.findAllSheets(1, 100);
      }
      if (!regex.test(q)) {
        response.status(400).send("bad query, please dont use special charactere")
      }
      result = await sheetsModel.findAllSheets(q || '', p || 1, n || 100);
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
          "label": "déserber",
          "month_begin": 6,
          "month_limit": 8
        }
      ]
    }
  ]
 *
 */
  getOneSheet: async (request, response) => {
    // fin the right sheet with the id param
    const sheetsId = parseInt(request.params.sheetsId);
    if (isNaN(sheetsId)) {
      return response.sendStatus(400);
    }
    try {
      let result = await sheetsModel.findOneSheet(sheetsId);
      if (!result) {
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
            "label": "déserber",
            "month_begin": 6,
            "month_limit": 8
          }
        ]
      }
    ]
  *
  */
  getActionFromSheet: async (request, response) => {
    const sheetsId = request.params.sheetsId;
    if (isNaN(sheetsId)) {
      return response.sendStatus(400)
    };
    try {
      const result = await actionModel.findAllAction(sheetsId);
      if (!result) {
        return response.status(204).send("no action associated to this sheet found")
      }
      response.status(200).json(result)
    } catch (error) {
      response.status(500).send(error);
    }
  },
  /**
   * GET /sheets/public
   * @summary get random sheet 
   * @param {string} request.query.n Query n values to choose number of sheet between 0 and 6
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
      {
        "id": 2,
        "title": "courgette",
        "description": "lorem ipsum",
        "photo": "courgette.png"       
      }
    ]
  
   *@returns {} 204 no sheet found
   *@returns {500} 500 internal error during request to the database

  */
  getRandom: async (request, response) => {
    let { n } = request.query
    try {
      if (isNaN(parseInt(n))) n = 3; //fix the default value to 3
      if (n > 6) n = 6;
      n = Math.abs(n) //au cas ou n soit négatif

      const result = await sheetsModel.getRandom(n);
      if (!result) {
        return response.status(204).send("no sheet found")
      }
      response.status(200).json(result)
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  },

  /**
   * POST /sheets/
   * @summary create a new sheet + category + action 
   * @param {object} request.body Express request body : contains the new task -  x-www-form-urlencoded
   * @example response - 201 - success response example
   * [
      {
        "title": "aubergine",
        "description": "lorem ipsum",
        "photo": "aubergine.png",
        "caracteristique": "lorem ipsum",
        "categories": [
          {
            "label": "légumes"
          }
        ],
        "actions": [
          {
            "label": "déserber",
            "month_begin": 6,
            "month_limit": 8
          }
        ]
      }
    ]
   *
   * 
   * @param {object} response Express response object contain task as json - x-www-form-urlencoded
   * @returns {object} 200 - success response - application/json
   * @example response - 200 - success response example
   * [
      {
        "id": 2,
        "title": "aubergine",
        "description": "lorem ipsum",
        "photo": "aubergine.png",
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
            "label": "déserber",
            "month_begin": 6,
            "month_limit": 8
          }
        ]
      }
    ]
   *
   */
  createNewSheet: async (request, response) => {
    //récupérer les informations de la fiches
    const sheet = request.body[0];
    //console.log(sheet);

    const { error } = await sheetSchema.validate(sheet);
    if (error) {
      return response.status(400).send(error.details[0].message)
    }
    try {
      //pour chaque categorie n'existant pas : les créer en renvoyant la categorie 
      // stocker chaque categorie dans un tableau
      const categoriesList = await sheetsModel.createCategorieByLabel(sheet.categories);
      //réaliser une requete pour la fiche : récuperer l'id
      const newSheet = await sheetsModel.createSheet(sheet)
      //console.log('sheet créé :',newSheet);


      //réaliser une requete pour les actions avec l'identifiantde la fiche
      let actionList;
      if (sheet.actions && sheet.actions.length > 0) {
        actionList = await sheetsModel.createActions(sheet.actions, newSheet.id)
      }
      //console.log(actionList);

      //dans sheet_has_categorie ajouter les anciennes et nouvelles catégorie à la fiche
      const result = await sheetsModel.linkCategoriesToSheet(categoriesList, newSheet.id);

      if (result.length !== categoriesList.length) return response.status(500).send('error : affect categorie to sheet has fail');

      //fin de la procedure on renvoit la fiche créé
      response.status(201).json({...newSheet, categories: categoriesList, actions: actionList} )
      
    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message)
    }

  }
}
module.exports = sheetsController