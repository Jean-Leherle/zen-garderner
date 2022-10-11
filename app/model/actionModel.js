const client = require("../config/db");

const actionModel = {
  /**
  * action model
  *@typedef {object} action
  *@property {integer} id- action identifier
  *@property {string} label.required - label of action
  *@property {integer} month_begin.required - month who begin the action
  *@property {integer} month_limit.required - month limit who the action must be finished
  *@property {integer}  sheet_id.required- the if of  sheet associated 
  */

  findAllAction: async (sheetId) => {
    const query = {
      text: `SELECT * FROM "action" WHERE "sheet_id" = $1 ORDER BY "id" ASC;`,
      values: [sheetId]
    }
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return [];
    };
  }
};
module.exports=actionModel;