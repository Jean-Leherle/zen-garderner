-- Active: 1664630442822@@127.0.0.1@5432@zeng
-- SQLBook: Code
-- Deploy zen-gardener:1.create_tables to pg

BEGIN;

CREATE DOMAIN ZIP AS TEXT CHECK (VALUE~'^[0-9]{5}$');
CREATE DOMAIN MAIL AS TEXT CHECK (VALUE~'^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$');
CREATE DOMAIN PHONE AS TEXT CHECK (VALUE~'^(\+33\s?|0)\d((\s|\.|\-|\_|)?\d{2}){3}(\3\d{2})$');
CREATE DOMAIN HEXACOLOR AS TEXT CHECK (VALUE~'^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?|[a-fA-F0-9]{3})$');



CREATE TABLE "user" (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    pseudo text NOT NULL,
    email MAIL NOT NULL UNIQUE,
    password text NOT NULL,
    adress text,
    zip_code ZIP,
    city text,
    phone PHONE, 
    task_notification BOOLEAN,
    week_notification BOOLEAN
);
CREATE TABLE "sheet" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    title text NOT NULL, 
    photo text NOT NULL, 
    description text NOT NULL, 
    caracteristique text NOT NULL

);
CREATE TABLE "task" (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    label text NOT NULL,
    begin_date TIMESTAMPTZ,
    limit_date TIMESTAMPTZ,
    user_id int REFERENCES "user"(id) ON DELETE CASCADE,
    sheet_id int REFERENCES sheet(id)
);


CREATE TABLE "categorie" (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    label text NOT NULL,
    color HEXACOLOR NOT NULL DEFAULT '#339900'
);

CREATE TABLE "action" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    label text NOT NULL,
    month_begin INT NOT NULL, 
    month_limit INT NOT NULL, 
    sheet_id int REFERENCES sheet(id) ON DELETE CASCADE
);

CREATE TABLE "add_favorite" (
    user_id int REFERENCES "user"(id) ON DELETE CASCADE,
    sheet_id int REFERENCES sheet(id) ON DELETE CASCADE
);

CREATE TABLE "role" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY UNIQUE,
    label TEXT NOT NULL
);

CREATE TABLE "sheet_has_categorie" (
    sheet_id int REFERENCES sheet(id) ON DELETE CASCADE,
    categorie_id int REFERENCES categorie(id) ON DELETE CASCADE
);

COMMIT;
