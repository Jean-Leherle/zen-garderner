const client = require("../config/db");

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

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }
};

module.exports = userModel;