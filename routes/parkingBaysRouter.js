const express = require('express');
const baysRouter = express.Router();
const baysController = require('../controllers/parkingBaysController.js');

// entry point for bays
baysRouter.route('/')
    .all(baysController.receiveRequest)
    .post(baysController.findBays)

module.exports = baysRouter;