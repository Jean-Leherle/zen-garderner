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

  findByUserId: async (id) => {
    const query = {
      text: `SELECT * FROM "task" WHERE "user_id" = $1 ORDER BY id ASC;`,
      values: [id],
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },
  addTasks: async (userId, tasks) => {
    const query = {
      text: `INSERT INTO "task" ("label", "begin_date", "limit_date", "user_id", "sheet_id") VALUES($1, $2, $3, $4, $5) returning *;`,
      values: [tasks.label, tasks.begin_date, tasks.limit_date, userId, tasks.sheet_id],
    };
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },
  deleteTasks: async (id, userId) => {
    const query = {
      text: `DELETE FROM "task" where id = $1 AND user_id = $2;`,
      values: [id, userId]
    };
    const result = await client.query(query);
    return result.rowCount
  },
  updateTasks: async (id, userId, tasks) => {
    const query = {
      text: `UPDATE task SET "label" = $1, "begin_date" =$2, "limit_date" = $3, "sheet_id" = $4 WHERE user_id = $5 AND id = $6 returning *;`,
      values: [tasks.label, tasks.begin_date, tasks.limit_date, tasks.sheet_id, userId, id]
    };
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },
  findTasksById: async (tasksId, userId) => {
    const query = {
      text: `SELECT * FROM "task" WHERE "id" = $1 AND "user_id" = $2 ORDER BY id ASC;`,
      values: [tasksId, userId],
    };
    console.log(query);
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  
  }
};
module.exports = tasksModel;