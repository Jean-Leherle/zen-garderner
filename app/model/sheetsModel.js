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
      /* text: `SELECT 
      json_build_object (
          'id', sheet.id,
          'title', sheet.title,
          'photo', sheet.photo,
          'description', sheet.description,
          'caracteristique', sheet.caracteristique,
          'categories', json_build_object(
            'categorie_id', categorie.id,
            'label', categorie.label
          ),
          'action', json_build_object(
            'id', action.id,
            'label', action.label,
            'month_begin', action.month_begin,
            'month_limit', action.month_limit
          )
        )
    FROM sheet 
    INNER JOIN "sheet_has_categorie" ShC ON ShC.sheet_id = sheet.id
    INNER JOIN "categorie" ON ShC.categorie_id =categorie.id
    INNER JOIN "action" ON sheet.id = action.sheet_id
    group by sheet.id
    ORDER BY sheet.id ASC
    OFFSET $1 ROWS
    FETCH FIRST $2 ROWS ONLY;`, */
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
        action.label label 
        FROM "action"
        WHERE action.sheet_id = sheet.id) 
      as X ) 
      as actions
    FROM sheet
      WHERE sheet.title COLLATE Latin1_General_CI_AI Like '%'||$1||'%' COLLATE Latin1_General_CI_A
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
          action.label label 
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
  }
}

module.exports = sheetsModel;

