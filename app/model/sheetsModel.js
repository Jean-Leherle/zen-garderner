const client = require("../config/db");

const sheetsModel = {
  /**
  * sheets model
  *@typedef {object} Sheets
  *@property {integer} id.sheets- sheets identifier
  *@property {string} title.required - label of sheets
  *@property {string} description.required - categorie of the sheet
  *@property {string} caracteristique.required - caracterisitque of the sheet
  *@property {string} photo.required- name of the photo associated to the sheet
  *@property {array<categorie>} categories  list of categorie
  *@property {array<action>} actions list of actions 
  */

  /**
   * @typedef {object} categorie array of object
   * @property {integer} id categorie identifier
   * @property {string} label name of the categorie
   * @property {string} color hexa of the color (^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?|[a-fA-F0-9]{3})$) 
   */


  /**
   * @typedef {object} action array of object
   * @property {integer} id action identifier
   * @property {string} label definition of the action
   * @property {integer} month_begin number of the month (1-12)
   * @property {integer} month_limit number of the month (1-12)
   * 
   */

  getRandom: async (n) => {
    const query = {
      text: `SELECT sheet.id, 
    sheet.title, 
    sheet.description,
    sheet.photo
    FROM sheet
    ORDER BY RANDOM()
    LIMIT $1`,
      values: [n]
    };
    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },

  findAllSheets: async (q, p, n) => {
    const query = {
      text: `
    SELECT sheet.id, 
    sheet.title, 
    sheet.description,
    sheet.photo,
    sheet.caracteristique,
    array(
      SELECT row_to_json(_) 
      from (SELECT categorie.id id, 
        categorie.label label,
        categorie.color color 
        FROM "sheet_has_categorie"
        JOIN "categorie" ON categorie.id = sheet_has_categorie.categorie_id 
        WHERE sheet_has_categorie.sheet_id = sheet.id) 
      as _) 
      as categories,
    array(
      SELECT row_to_json(X) 
      from (SELECT action.id id, 
        action.label label,
        action.month_begin month_begin,
        action.month_limit month_limit 
        FROM "action"
        WHERE action.sheet_id = sheet.id) 
      as X ) 
      as actions
    FROM sheet
      WHERE LOWER(sheet.title) Like LOWER('%'||$1||'%')
      ORDER BY sheet.id ASC
    OFFSET $2 ROWS
    FETCH FIRST $3 ROWS ONLY;`,
      values: [q, (p - 1) * n, n]
    }

    const result = await client.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },

  findOneSheet: async (id) => {
    const query = {
      text: `SELECT sheet.id, 
      sheet.title, 
      sheet.description,
      sheet.photo,
      sheet.caracteristique,
      array(
        SELECT row_to_json(_) 
        from (SELECT categorie.id id, 
          categorie.label label,
          categorie.color color 
          FROM "sheet_has_categorie"
          JOIN "categorie" ON categorie.id = sheet_has_categorie.categorie_id 
          WHERE sheet_has_categorie.sheet_id = sheet.id) 
        as _) 
        as categories,
        array(
          SELECT row_to_json(X) 
          from (SELECT action.id id, 
            action.label label,
            action.month_begin month_begin,
            action.month_limit month_limit 
            FROM "action"
            WHERE action.sheet_id = sheet.id) 
          as X ) 
          as actions
        FROM sheet
        WHERE sheet.id= $1`,
      values: [id]
    }
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },

  /**
   * @summary get an array of categorie to create missing one then return the full array of them
   * @param {array<categorie>} categories List of categorie 
   * @returns array of categorie
   */
  createCategorieByLabel: async (categories) => {
    const resultList = []
    for (const categorie of categories) {
      const getQuery = {
        text: `
      SELECT * FROM "categorie" 
      WHERE categorie.label =$1;`,
        values: [categorie.label]
      }
      const getResult = await client.query(getQuery);
      if (getResult.rows.length > 0) resultList.push(getResult.rows[0]);
      else {
        const createQuery = { //todo ajouter la couleur que ce sera possible
          text: ` 
        INSERT INTO "categorie" ("label")
        VALUES ($1) returning *;`,
          values: [categorie.label]
        }
        const createResult = await client.query(createQuery);
        resultList.push(createResult.rows[0]);
      }
    }//fin du for
    return resultList

  },

  createSheet: async (sheet) => {
    const query = {
      text: `INSERT INTO "sheet" 
      (title, description, photo, caracteristique)
      VALUES ($1,$2,$3,$4) returning *;`,
      values: [sheet.title, sheet.description, sheet.photo, sheet.caracteristique]
    }
    const result = await client.query(query);
    return result.rows[0]

  },

  createActions: async (actions, sheetId) => {
    const actionList = [];
    const query = {
      text: `INSERT INTO "action" 
      (label, month_begin, month_limit, sheet_id)
      VALUES `,
      values: [],
      index: 1
    }

    for (const action of actions) {
      query.text += '('
      for (const param in action) {
        query.text += `$${query.index},`;
        query.values.push(action[param]);
        query.index++;
      }
      query.text += `$${query.index}),`;
      query.values.push(sheetId)
      query.index++;

    }
    query.text = query.text.slice(0, -1);
    query.text += ' returning *;';
    //console.log(query);
    const result = await client.query(query)
    return result.rows
  },
  linkCategoriesToSheet: async (categoriesList, sheetId) => {
    const query = {
      text: `INSERT INTO "sheet_has_categorie" 
      (sheet_id,categorie_id)
      VALUES `,
      values: [],
      index: 1
    }
    for (const categorie of categoriesList) {
      query.text += `($${query.index},$${query.index+1}),`;
      query.values.push(sheetId, categorie.id);
      query.index+=2;
    }
    query.text= query.text.slice(0, -1);
    query.text += ' returning *;';
    //console.log(query);

    const result = await client.query(query)
    //console.log(result);
    return result.rows
  },


  // --------------favorite ----------------


  findSheetsByUserFavorite: async (userId) => {
    const query = {
      text: `
      SELECT sheet.id, 
      sheet.title, 
      sheet.description,
      sheet.photo,
      sheet.caracteristique,
      array(
        SELECT row_to_json(_) 
        from (SELECT categorie.id id, 
          categorie.label label,
          categorie.color color 
          FROM "sheet_has_categorie"
          JOIN "categorie" ON categorie.id = sheet_has_categorie.categorie_id 
          WHERE sheet_has_categorie.sheet_id = sheet.id) 
        as _) 
        as categories,
      array(
        SELECT row_to_json(X) 
        from (SELECT action.id id, 
          action.label label,
          action.month_begin month_begin,
          action.month_limit month_limit
          FROM "action"
          WHERE action.sheet_id = sheet.id) 
        as X ) 
        as actions
      FROM sheet
      JOIN add_favorite ON sheet.id = add_favorite.sheet_id
        WHERE add_favorite.user_id= $1`,
      values: [userId]
    };
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    };
  },
  addSheetToFavorite: async (userId, sheetsId) => {
    const query = {
      text: `INSERT INTO "add_favorite"("user_id","sheet_id")
      VALUES($1, $2);`,
      values: [userId, sheetsId]
    };
    await client.query(query);
  },
  deleteFromFavorite: async (userId, sheetsId) => {
    const query = {
      text: `DELETE FROM "add_favorite" 
      WHERE user_id = $1 AND sheet_id=$2;`,
      values: [userId, sheetsId]
    };
    await client.query(query);
  }
}

module.exports = sheetsModel;

