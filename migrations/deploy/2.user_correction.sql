-- Deploy zen-gardener:2.user_correction to pg

BEGIN;

ALTER TABLE "USER" 
RENAME COLUMN "adress" TO "address";
ALTER TABLE "USER"
ALTER COLUMN "email" UNIQUE NOT NULL;

ALTER TABLE "USER"
ALTER COLUMN "task_notification" BOOLEAN NOT NULL;
ALTER TABLE "USER"
ALTER COLUMN "week_notification" BOOLEAN NOT NULL;

COMMIT;


