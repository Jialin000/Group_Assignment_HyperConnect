const express = require('express');
const baysRouter = express.Router();
const baysController = require('../controllers/parkingBaysController.js');

// display all the parkingBays
baysRouter.route('/')
    .get(baysController.getBays)

// Try to find a parkingbay
baysRouter.route('/find')
    .get(baysController.findBays)

module.exports = baysRouter;