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
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    };
  }, 

   findByPseudo: async (pseudo) => {
    const query = {
      text: `SELECT * FROM "user" WHERE "pseudo" = $1;`,
      values: [pseudo],
    };
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    };
   },

  insertUser: async (pseudo, email, password, address, zip_code, city, phone, task_notification, week_notification) => {
    const insertQuery = {
      text: `INSERT INTO "user" ("pseudo", "email", "password", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification")
      
      VALUES('$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8', '$9');`,
      values: [pseudo, email, password, address, zip_code, city, phone, task_notification, week_notification],
    };

    insertQuery.text =
      `INSERT INTO "user"
      ("pseudo", "email", "password", "address", "zip_code", "city", "phone", "task_notification", "week_notification") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    insertQuery.values = [ pseudo, email, password, address, zip_code, city, phone, task_notification, week_notification ];

    const result = await client.query(insertQuery);
    console.log(result.rows);

    const insertedUser = result.rows[0];
    return insertedUser;
  }
};

module.exports = userModel;