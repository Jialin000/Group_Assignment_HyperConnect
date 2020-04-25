const express = require('express');
const baysRouter = express.Router();
const baysController = require('../controllers/parkingBaysController.js');

// display all the parkingBays
baysRouter.route('/')
    .all(baysController.receiveRequest)
    .get(baysController.getBays)

// Try to find a parkingbay
baysRouter.route('/find')
    .all(baysController.receiveRequest)
    .post(baysController.findBays)

module.exports = baysRouter;