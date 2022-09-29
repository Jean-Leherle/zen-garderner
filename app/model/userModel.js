const client = require("../config/db");

const userModel = {
  /**
   * Author model
   *@typedef {object} User
   *
   *@property {integer} id.required - user identifier
   *@property {string} pseudo.required - pseudo of user
   *@property {string} email.required - email of user
   *@property {string} adress - adress of user
   *@property {string} zipcode - zip code of user's adress
   *@property {string} city - city of user's adress
   *@property {string} phone - phone number
   *@property {boolean} task_notification - accept notification for each task all day
   *@property {boolean} week_notification - accept notification of resume's task each week
   */
  findByEmail: async (email) => {
    const query = {
      text: `SELECT * FROM "user" WHERE "email" = $1;`,
      values: [email],
    }

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }
};

module.exports = userModel;