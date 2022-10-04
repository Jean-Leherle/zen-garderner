const client = require("../config/db");

const sheetsModel = {
      /**
   * sheets model
   *@typedef {object} Sheets
   *@property {integer} id.sheets- sheets identifier
   *@property {string} label.required - label of sheets
   *@property {integer} categorie_id - categorie of the sheet
   *@property {integer} user_id.required - the member who added the sheet to their favorites
   */

  findAllSheets : async () => {
    const query = {
        text: `SELECT * FROM "sheets"
        JOIN action
        JOIN add_favorite
        JOIN categorie
        JOIN sheet_has_categorie;`,
       // values: [id],
      }
  }
}

module.exports = sheetsModel; 