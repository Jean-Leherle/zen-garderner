-- SQLBook: Code

BEGIN;

SELECT id, pseudo, email, password, adress, zip_code, city, phone, task_notification, week_notification FROM "user";

SELECT id, title, photo, description, caracteristique FROM "sheet";
SELECT id, label, begin_date, limit_date, user_id, sheet_id FROM "task";
SELECT id, label FROM "categorie";
SELECT id, label, month_begin, month_limit, sheet_id FROM "action";
SELECT user_id, sheet_id FROM "add_favorite";
SELECT id, label FROM "role";
SELECT sheet_id, categorie_id FROM "sheet_has_categorie";


ROLLBACK;
