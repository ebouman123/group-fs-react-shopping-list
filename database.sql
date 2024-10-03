-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "shoppinglist" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "quantity" DECIMAL,
    "unit" VARCHAR(20)
);

INSERT INTO "shoppinglist" ("name", "quantity", "unit")
VALUES ('Apple', 5, 'lbs'),
       ('Milk', 2, 'gallon');
