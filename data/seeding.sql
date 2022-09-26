-- SQLBook: Code
BEGIN;

INSERT INTO "user" ("id", "pseudo", "email", "password", "adress", "zip_code", "city", "phone", "task_notification", "week_notification") 
VALUES();

INSERT INTO "sheet" ("id", "title", "photo", "description", "caracteristique")
VALUES();
INSERT INTO "task" ("id", "label", "begin_date", "limit_date", "user_id", "sheet_id") 
VALUES();
INSERT INTO "categorie" ()VALUES(); label FROM categorie;
INSERT INTO "sheet", label, month_begin, month_limit, sheet_id FROM action;
INSERT INTO "sheet", sheet_id FROM add_favorite;
INSERT INTO "sheet" id, label FROM role;
INSERT INTO "sheet" sheet_id, categorie_id FROM sheet_has_categorie;


ROLLBACK;