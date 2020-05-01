//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const fetch = require('node-fetch');

const updateDatabase = (req, res, next) => {

    // Fetch real time data from open data platform
    const db = mongoose.connection;
    let url = "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json";
    let settings = { method: "Get" };
    let bays = [];
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {

            // Update data
            for(let i_data = 0; i_data < json.length; i_data++){
                const bay = {
                  bay_id: json[i_data]["bay_id"],
                  st_marker_id: json[i_data]["st_marker_id"],
                  status: json[i_data]["status"],
                  location: json[i_data]["location"],
                  lat: json[i_data]["lat"],
                  lon: json[i_data]["lon"]
                }
                bays.push(bay)
                db.collection('parkingBays').updateOne({bay_id:bay["bay_id"]},{$set:bay},{upsert: true});
              };
        return res.send("database have been updated");
    })
};


module.exports = {
    updateDatabase
}