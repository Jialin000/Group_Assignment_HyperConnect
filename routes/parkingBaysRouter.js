const express = require('express');
const baysRouter = express.Router();
const baysController = require('../controllers/parkingBaysController.js');

baysRouter.route('/')
    .all(baysController.receiveRequest)
    .get(baysController.getBays)

// entry point for bays
baysRouter.route('/find')
    .all(baysController.receiveRequest)
    .post(baysController.findBays)

module.exports = baysRouter;