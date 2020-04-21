// js file to represents database
var bays = require('../models/parkingBays.js');

// functions to handle different requests for bays related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};

const findBays = (req, res, next) => {
    const location = {
        bay_id: req.body.bay_id
    }
    
    const bay = bays.find(bay => bay.bay_id === location.bay_id);

    if (bay) {
        res.send(bay);
    } else {
        res.statusCode = 500;
        res.send([]);
    }
};

module.exports = {
    receiveRequest,
    findBays,
}


