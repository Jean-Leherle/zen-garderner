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
  addTasks: async (userId, tasks)=>{
    const query = {
      text: `INSERT INTO "task" ("label", "begin_date", "limit_date", "user_id", "sheet_id") VALUES($1, $2, $3, $4, $5);`,
      values: [tasks.label, tasks.beginDate, tasks.limitDate,userId, tasks.sheetId ],
    };
  }
};
module.exports = tasksModel;