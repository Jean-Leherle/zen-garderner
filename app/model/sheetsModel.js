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

  findAllSheets: async (p,n) => {
    const query = {
      text: `SELECT sheet.id, sheet.title, sheet.photo, sheet.description, sheet.caracteristique,ARRAY_AGG(categorie.id) as "categories.id" , 
      ARRAY_AGG(categorie.label) as "categories.label"  FROM "sheet"
        JOIN "sheet_has_categorie" ON sheet_has_categorie.sheet_id = sheet.id
        JOIN "categorie" ON categorie.id = sheet_has_categorie.categorie_id
        GROUP BY sheet.id
        ORDER BY sheet.id ASC
        OFFSET $1 ROWS
        FETCH FIRST $2 ROWS ONLY;`,
        values: [(p-1)*n,n]
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
      text: `SELECT sheet.id, sheet.title, sheet.photo, sheet.description, sheet.caracteristique,ARRAY_AGG(categorie.id) as "categories.id" , 
      ARRAY_AGG(categorie.label) as "categories.label"  FROM "sheet"
        JOIN "sheet_has_categorie" ON sheet_has_categorie.sheet_id = sheet.id
        JOIN "categorie" ON categorie.id = sheet_has_categorie.categorie_id
        WHERE sheet.id = $1
        GROUP BY sheet.id;`,
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