-- SQLBook: Code
-- Revert zen-gardener:1.create_tables from pg

BEGIN;
 DROP TABLE IF EXISTS  "sheet_has_categorie", "role", "add_favorite", "action", "categorie", "task", "sheet", "user";
 DROP DOMAIN IF EXISTS  zip, mail, phone, HEXACOLOR;

COMMIT;
