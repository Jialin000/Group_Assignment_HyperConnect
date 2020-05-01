const express = require('express');
const databaseRouter = express.Router();
const databaseController = require('../controllers/databaseController.js');

// display all the parkingBays
databaseRouter.route('/')
    .all(databaseController.receiveRequest)
    .get(databaseController.updateDatabase)

module.exports = databaseRouter;