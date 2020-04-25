//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const Bays = mongoose.model("parkingBays");


// functions to handle different requests for bays related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};

//return all the parking bays
const getBays = async(req, res, next) => {
    try {
        const all_bays = await Bays.find();
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
        const bay = findNearest(location, all_bays)
        if (bay) {
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


