-- Deploy zen-gardener:2.user_correction to pg

BEGIN;

ALTER TABLE "user" 
RENAME COLUMN "adress" TO "address";

ALTER TABLE "user"
ALTER COLUMN "task_notification" set NOT NULL;
ALTER TABLE "user"
ALTER COLUMN "week_notification" set NOT NULL;

COMMIT;


