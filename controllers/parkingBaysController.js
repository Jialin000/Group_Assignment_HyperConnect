// js file to represents database
var bays = require('../models/parkingBays.js');

// functions to handle different requests for bays related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};

const findBays = (req, res, next) => {
    const location = {
        lat: req.body.lat,
        lon: req.body.lon
        // bay_id: req.body.bay_id
    }
    //const bay = bays[0]
    const bay = findNearest(location, bays)
    //const bay = bays.find(bay => bay.bay_id === location.bay_id);
    if (bay) {
        res.send(bay);
    } else {
        res.statusCode = 500;
        res.send([]);
    }
};


function findNearest(location, bays){
    let distance = 100000000;
    let target_bay = 0;
    for(let i_bay = 0; i_bay < bays.length; i_bay++){
        new_distance = Math.pow((parseFloat(location.lat)-parseFloat(bays[i_bay].lat)),2) + Math.pow((parseFloat(location.lon)-parseFloat(bays[i_bay].lon)),2);
        if(new_distance < distance && bays[i_bay].status=='Unoccupied'){
            distance = new_distance;
            target_bay = i_bay;
        }
    }
    return bays[target_bay];
}

module.exports = {
    receiveRequest,
    findBays,
}


