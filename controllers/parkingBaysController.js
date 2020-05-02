//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const Bays = require('../models/parkingBays.js');


//return all the parking bays
const getBays = async(req, res, next) => {
    try {

        // get information about parking bay from database
        const all_bays = await Bays.find();
        res.statusCode = 200;
        return res.send(all_bays);
      } catch (err) {
        res.status(400);
        return res.send("Database query failed");
      }
    }

//find the next n parking spaces
const findBays = async(req, res, next) => {
    try {
        const all_bays = await Bays.find();
        const location = {
            lat: req.body.lat,
            lon: req.body.lon
        }

        // find the list of nearest parking bays
        const bay = findNearest(location, all_bays)
        if (bay) {
            res.statusCode = 200;
            res.send(bay);
        } else {
            res.statusCode = 500;
            res.send([]);
        }
      } catch (err) {
        res.status(400);
        return res.send("input not valid");
      }
};

// function calculate the distance and return the n nearest parking bays
function findNearest(location, bays){

    let list = [];

    for(let i = 0; i < bays.length; i++){

        if(bays[i].status=='Unoccupied'){
            let new_distance = 111 * 1000 * Math.sqrt(
                Math.pow((parseFloat(location.lat)-parseFloat(bays[i].lat)),2)
                + Math.pow((parseFloat(location.lon)-parseFloat(bays[i].lon)),2)
            );
            let x = new Object;
            x[new_distance] = bays[i];
            list.push(x)
        }
    }

    // sort the parking bays in ascending distance and return the 10 nearest ones
    list.sort(function(a,b) { return Object.keys(a) - Object.keys(b); } );
    let topTen = []
    for(let i=0; i<10 && i<list.length; i++) {
        topTen.push(list[i])
    }
    return topTen;
}

module.exports = {
    findBays,
    getBays
}


