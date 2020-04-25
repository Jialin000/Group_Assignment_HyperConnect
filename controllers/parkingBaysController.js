// js file to represents database
var bays = require('../models/parkingBays.js');

// functions to handle different requests for bays related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};

const getBays = (req, res, next) => {
    res.send(bays);
    }

const findBays = (req, res, next) => {
    const location = {
        lat: req.body.lat,
        lon: req.body.lon
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

    var list = [];

    for(let i_bay = 0; i_bay < bays.length; i_bay++){
        new_distance = 111*1000*Math.sqrt(Math.pow((parseFloat(location.lat)-parseFloat(bays[i_bay].lat)),2) + Math.pow((parseFloat(location.lon)-parseFloat(bays[i_bay].lon)),2));
        if(bays[i_bay].status=='Unoccupied'){
            let x = new Object;
            x[new_distance] = bays[i_bay];
            list.push(x)
        }
    }
    list.sort(function(a,b) { return Object.keys(a) - Object.keys(b); } );
    Top3 = []
    for(var i=0; i<3 && i<list.length; i++) {
        Top3.push(list[i])
    }
    return Top3;
}

module.exports = {
    receiveRequest,
    findBays,
    getBays
}


