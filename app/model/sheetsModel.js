const client = require("../config/db");

const sheetsModel = {
  /**
  * sheets model
  *@typedef {object} Sheets
  *@property {integer} id.sheets- sheets identifier
  *@property {string} title.required - label of sheets
  *@property {string} description.required - categorie of the sheet
  *@property {string} caracteristique.required - caracterisitque of the sheet
  *@property {string}  photo.required- name of the photo associated to the sheet
  */

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
        categorie.label label 
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
          categorie.label label 
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
          categorie.label label 
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

