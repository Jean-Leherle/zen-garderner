-- SQLBook: Code
-- Active: 1664201511757@@127.0.0.1@5432@zeng
-- SQLBook: Code
BEGIN;

INSERT INTO "user" ("pseudo", "email", "password", "address", "zip_code", "city", "phone", "task_notification", "week_notification") 
VALUES('Clo', 'cloclo@cloclo.fr', '12345', '3 rue des figues', '10000', 'Troyes', '06-32-15-30-96','true','true'),
('Gérard', 'gege@alo.fr', 'azert', '2 rue du pli', '75001', 'Paris','06-33-16-31-97','true','false');


INSERT INTO "sheet" ("title", "photo", "description", "caracteristique")
VALUES('carotte orange', 'carotte_orange.png', 'lorem ipsum', 'lorem ipsum'),
('courgette', 'courgette.png', 'lorem ipsum', 'lorem ipsum');

INSERT INTO "task" ("label", "begin_date", "limit_date", "user_id", "sheet_id") 
VALUES('arrosage carotte', '06/06/2023', '07/06/2023', 1, 1),
('couper la haie', '04/10/2022', '10/10/2022', 1, NULL),  
('arrosage courgette', '08/06/2023', '09/06/2023', 2, 2);

INSERT INTO "categorie" ("label")
VALUES('fruits'),('légumes');
INSERT INTO "action"("label", "month_begin", "month_limit", "sheet_id")
VALUES('arroser', 6, 8, 1),
('déserber', 5, 6, 2);
INSERT INTO "add_favorite"("user_id","sheet_id")
VALUES(1, 1), (2,2); 
INSERT INTO "role" ("label") VALUES('administrateur'),('utilisateur');
INSERT INTO "sheet_has_categorie" ("sheet_id", "categorie_id")VALUES(1,2),(2,2);


COMMIT;

begin;
INSERT INTO "user" ("pseudo", "email", "password", "task_notification", "week_notification") VALUES('bob', 'bob@bob.bob','$argon2id$v=19$m=4096,t=3,p=1$Dj+eFNo2t0gXcy3MTByb0A$jJcvF6iWIuvJSlBaA9l0fRIIt3rMPZVrc4OZr/NfH7c', true,false);
Commit;

BEGIN;
INSERT INTO "categorie" ("label")
VALUES('facile');
INSERT INTO "sheet_has_categorie" ("sheet_id", "categorie_id")VALUES(1,3);

COMMIT;