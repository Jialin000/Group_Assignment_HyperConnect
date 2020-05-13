//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const Bays = require('../models/parkingBays.js');


//return all the parking bays
const getBays = async(req, res, next) => {
    try {

        // get information about parking bay from database
        const all_bays = await Bays.find();
        res.statusCode = 200;

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

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
            lat: req.query.lat,
            lon: req.query.lon
        }
        // find the list of nearest parking bays
        if(isNaN(location.lat)||isNaN(location.lon)){
            res.send("Input should be numeric value");
        }
        const bay = findNearest(location, all_bays)
        if (bay) {
            if(parseFloat(Object.keys(bay[0]))>3000){
                res.statusCode = 500;
                res.send("Your search regin is currently not available");
            }
            else{
                res.statusCode = 200;
                res.send(bay);
            }
        } else {
            res.statusCode = 500;
            res.send("bays not found");
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


