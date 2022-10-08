const sheetsModel = require('../model/sheetsModel')
const memberModel = require('../model/memberModel')

const favoriteController = {
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