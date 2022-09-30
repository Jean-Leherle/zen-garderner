const client = require("../config/db");

const tasksModel = {
  /**
   * tasks model
   *@typedef {object} Tasks
   *@property {integer} id.required - tasks identifier
   *@property {string} label.required - label of tasks
   *@property {string} begin_date - date when begin the tasks - date-time
   *@property {string} limit_date - last date to end the tasks - date-time
   *@property {integer} user_id.required - owner of tasks identifier
   *@property {integer} user_id - sheet who refered the tasks
   */

  findByUserId:async (id)=>{
    const query = {
      text: `SELECT * FROM "task" WHERE "user_id" = $1;`,
      values: [id],
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },
};
module.exports = tasksModel;