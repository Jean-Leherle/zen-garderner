const pool = require("../config/db");

const userModel = {
  /**
   * @param {string} email testé dans la bdd
   * @param {user} user renvoyé en totalité
   */
  findByEmail: async (email) => {
    const query = {
      text: `SELECT * FROM "user" WHERE "email" = $1;`,
      values: [email],
    }

    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }, 

  insertUser: async (pseudo, email, password, week_notification, task_notification) => {
    const insertQuery = {
      text: `"user" ("pseudo", "email", "password", "adress", "zip_code", "city", "phone", 
      "task_notification", "week_notification")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      values: [pseudo, email, password, adress, zip_code, city, phone, week_notification, task_notification],
    };
    const client = await pool.connect();
    const result = await client.query(insertQuery);
    client.release();
    const insertedUser = result.rows[0];
    return insertedUser;

    }
};

module.exports = userModel;