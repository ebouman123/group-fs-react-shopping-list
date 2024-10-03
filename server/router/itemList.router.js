const express = require("express");
const router = express.Router();
const pool = require("../modules/pool.js");

// Setup a GET route to get all the items from the database
router.get("/", (req, res) => {
  const sqlText = `SELECT * FROM shoppinglist ORDER BY name ASC;`;
  pool
    .query(sqlText)
    .then((result) => {
      // console.log(`Got stuff back from the database`, result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

// Setup a POST route to add a new item to the database
router.post("/", (req, res) => {
  const list = req.body;
  const sqlText = `INSERT INTO shoppinglist ("name", "quantity", "unit")
                     VALUES ($1, $2,$3)`;

  pool
    .query(sqlText, [list.name, list.quantity, list.unit])
    .then((result) => {
      // console.log('Item added in the shopping list');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500); // Good server always responds
    });
});

// DELETE

router.delete("/:id", (req, res) => {
  const itemId = req.params.id;

  // const queryText = 'DELETE FROM "shoppinglist" WHERE "id" = $1;';
  let queryText;
  let queryParams = [];

  if (itemId) {
    queryText = 'DELETE FROM "shoppinglist" WHERE "id" = $1;';
    queryParams = [itemId];
  } else {
    queryText = 'DELETE FROM "shoppinglist";';
  }

  pool
    .query(queryText, queryParams)
    .then((result) => {
      if (itemId && result.rowCount === 0) {
        return res.status(404).json({ message: "err" });
      }
      res.status(200).json({ message: "Item deleted" });
    })
    .catch((error) => {
      console.error(`err: ${queryText}`, error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const listId = [req.params.id];
  let purchasedStatus = req.body.purchased;
  let queryText = "";

  if (purchasedStatus) {
    queryText = `
        UPDATE "shoppinglist" SET "purchased"=false
        WHERE "id"=$1;
        `;
  } else {
    queryText = `
        UPDATE "shoppinglist" SET "purchased"=true
        WHERE "id"=$1;
        `;
  }

  pool
    .query(queryText, listId)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("Error making PUT query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
