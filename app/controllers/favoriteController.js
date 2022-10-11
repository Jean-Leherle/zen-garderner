const sheetsModel = require('../model/sheetsModel')
const memberModel = require('../model/memberModel')

const favoriteController = {
  /**
   *  GET /member/sheet/
     * @summary allow the member to get all favorite he added 
     * @param {string} request
     * @param {object} response Express response object 
     * @returns {object} 400 - bad request
     * @returns {object} 204 - no favorite found so return nothing
     
     * @returns {object} 200 - success response - application/json
     * @example response - 200 - success reponse example 
     *   [
          {
            "id": 5,
            "title": "Patate",
            "description": "Lorem ipsum ",
            "photo": "https://www.link-to-photo.com",
            "caracteristique": "[Semis: pleine terre][Période de semis (pleine terre) : Février, Mars, Avril, Mai, Juin, Juillet]",
            "categories": [	{
                "id": 2,
                "label": "légumes"
              }],
            "actions": [{
                "id": 1,
                "label": "arroser",
                "month_begin": 6,
                "month_limit": 8
              }]
          }
        ]
   */
  getFavorite: async (request, response) => {
    const userId = request.decodedToken.user_id;
    const user = await memberModel.findById(userId);
    if (!user) {
      return response.sendStatus(400)
    };
    try {
      const result = await sheetsModel.findSheetsByUserFavorite(userId);
      if (!result) {
        return response.status(204).send('no favorite found');
      };
      return response.status(200).json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  },
  /**
   *  POST /member/sheet/:sheetId
     * @summary add a new favorite to the user 
     * @param {string} request.params.sheetId 
     * @param {object} response Express response object 
     * @returns {object} 201 - success response - application/json
     * @returns {object} 204 - no favorite found so return nothing
     * @returns {object} 400 - bad request
     * @returns {object} 401 - tokken error : user not found
     * 
   */
  addFavorite: async (request, response) => {
    const sheetsId = request.params.sheetsId
    const userId = request.decodedToken.user_id;
    try {
      if (!userId) return response.status(401).send('token error : user not found')
      const user = await memberModel.findById(userId);
      if (!user) return response.sendStatus(400);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error)
    }

    if (isNaN(parseInt(sheetsId))) return response.sendStatus(400)

    try {
      const sheetsList = await sheetsModel.findSheetsByUserFavorite(userId);
      const sheet = await sheetsModel.findOneSheet(sheetsId)

      if (!sheet || (sheetsList && sheetsList.find(sheets => sheets.id === parseInt(sheetsId)))) { //verify if user already exist

        return response.sendStatus(204)
      };
      await sheetsModel.addSheetToFavorite(userId, sheetsId);
      return response.sendStatus(201);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  },
  /**DELETE /member/sheet/:sheetId
     * @summary supress this favorite from the favorite liste 
     * @param {string} request.params.sheetId 
     * @param {object} response Express response object 
     * @returns {object} 204 - success response - application/json
     * @returns {object} 400 - bad request
     * 
   */
  deleteFavorite: async (request, response) => {
    const sheetsId = request.params.sheetsId
    const userId = request.decodedToken.user_id;

    try {
      const favorites = await sheetsModel.findSheetsByUserFavorite(userId)
      if (!favorites || isNaN(parseInt(sheetsId)) || !favorites.find(favorite => favorite.id === parseInt(sheetsId))) {
        return response.sendStatus(400)
      }
      await sheetsModel.deleteFromFavorite(userId, sheetsId);
      return response.sendStatus(204);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  }
}


module.exports = favoriteController