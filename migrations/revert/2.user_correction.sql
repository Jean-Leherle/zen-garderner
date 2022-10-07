-- Revert zen-gardener:2.user_correction from pg

BEGIN;

ALTER TABLE "USER" 
RENAME COLUMN "address" TO "adress";

ALTER TABLE "USER"
ALTER COLUMN "task_notification" BOOLEAN;
ALTER TABLE "USER"
ALTER COLUMN "week_notification" BOOLEAN;

COMMIT;

