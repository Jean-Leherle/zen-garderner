const client = require("../config/db");

const memberModel = {
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
    };

    const result = await client.query(query);
  
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    };
  },
  
  findById: async (id) => {
    const query = {
      text: `SELECT "pseudo", "email", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification"
      FROM "user" WHERE "id" = $1;`,
      values: [id],
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
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "pseudo", "email", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification";`,
      values: [pseudo, email, password, address, zip_code, city, phone, task_notification, week_notification],
    };
    const result = await client.query(insertQuery);
    const insertedUser = result.rows[0];
    return insertedUser;
  },

  updateUser: async(pseudo, email, address, zip_code, city, phone, task_notification, week_notification, id) => {
    const updateQuery = {
      text: `UPDATE "user" SET "pseudo"=$1, "email"=$2, "address"=$3, "zip_code"=$4, 
      "city"=$5, "phone"=$6, "task_notification"=$7, "week_notification"=$8
      WHERE "id"= $9 RETURNING "pseudo", "email", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification"`,

      values: [pseudo, email, address, zip_code, city, phone, task_notification, week_notification, id],
    };
    const result = await client.query(updateQuery);
    console.log(updateQuery);
    const updateUser = result.rows[0];
    return updateUser;
  }
};

module.exports = memberModel;