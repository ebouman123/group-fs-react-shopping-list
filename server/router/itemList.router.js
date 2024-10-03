const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Setup a GET route to get all the items from the database
router.get('/', (req, res) => {
    
    const sqlText = `SELECT * FROM shoppinglist ORDER BY name ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got stuff back from the database`, result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); 
        })
})

// Setup a POST route to add a new item to the database
router.post('/', (req, res) => {
    const list = req.body;
    const sqlText = `INSERT INTO shoppinglist ("name", "quantity", "unit")
                     VALUES ($1, $2,$3)`;   
    
    pool.query(sqlText, [list.name, list.quantity, list.unit])
        .then((result) => {
            console.log('Item added in the shopping list');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


module.exports = router;