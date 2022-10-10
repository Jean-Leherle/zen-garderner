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
  
  findById: async (id) => {
    const query = {
      text: `SELECT * FROM "user" WHERE "id" = $1;`,
      values: [id],
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
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
  findAll: async() => {
    const query = {
      text: `SELECT * FROM "user"`,
    };
    const result = await client.query(query);
    return result.rows;
   
  },
  insertUser: async (user) => {
    const insertQuery = {
      text: `INSERT INTO "user" ("pseudo", "email", "password", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "pseudo", "email", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification";`,
      values: [user.pseudo, user.email, user.password, user.address, user.zip_code, user.city, user.phone, user.task_notification, user.week_notification],
    };
    const result = await client.query(insertQuery);
    const insertedUser = result.rows[0];
    return insertedUser;
  },

  updateUser: async(user) => {
    const updateQuery = {
      text: `UPDATE "user" SET "pseudo"=$1, "email"=$2, "address"=$3, "zip_code"=$4, 
      "city"=$5, "phone"=$6, "task_notification"=$7, "week_notification"=$8
      WHERE "id"= $9 RETURNING "pseudo", "email", "address", "zip_code", 
      "city", "phone", "task_notification", "week_notification"`,

      values: [user.pseudo, user.email, user.address, user.zip_code, user.city, user.phone, user.task_notification, user.week_notification, user.id],
    };
    const result = await client.query(updateQuery);
    const updateUser = result.rows[0];
    return updateUser;
  }, 

  findUserTaskNotificationTrue : async() => {
    const query = {
      text: `SELECT "user".id, "user".pseudo, "user".email, 
      array(
        SELECT row_to_json(X) 
        from (
          SELECT task.label "label", 
          task.begin_date begin_date,
          task.limit_date limit_date,
          task.sheet_id sheet_id
          FROM "task"
          WHERE "user".id = task.user_id) 
        as X ) 
        as tasks
      FROM "user" 
      WHERE "user".task_notification = true; `
    }
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  }, 

  findUserWeekNotificationTrue : async() => {
    const query = {
      text: `SELECT "user".id, "user".pseudo, "user".email, 
      array(
        SELECT row_to_json(X) 
        from (
          SELECT task.label "label", 
          task.begin_date begin_date,
          task.limit_date limit_date,
          task.sheet_id sheet_id
          FROM "task"
          WHERE "user".id = task.user_id) 
        as X ) 
        as tasks
      FROM "user" 
      WHERE "user".week_notification = true;`
    }
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    };
  }, 

};

module.exports = memberModel;