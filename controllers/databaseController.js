//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const fetch = require('node-fetch');

const updateDatabase = (req, res, next) => {

    // Fetch real time data from open data platform
    const db = mongoose.connection;
    let url = "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?%24limit=5000&%24%24app_token=AdyvI0gKUddcE1r6gTOaarTiX";;
    let settings = { method: "Get" };
    let bays = [];
    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {

            // Update data
            for(let i = 0; i < json.length; i++){
                const bay = {
                  bay_id: json[i]["bay_id"],
                  st_marker_id: json[i]["st_marker_id"],
                  status: json[i]["status"],
                  location: json[i]["location"],
                  lat: json[i]["lat"],
                  lon: json[i]["lon"]
                }
                bays.push(bay)
                db.collection('parkingBays').updateOne({bay_id:bay["bay_id"]},{$set:bay},{upsert: true});
              };
        return res.send(bays.length + " records from database have been updated");
    })
};


module.exports = {
    updateDatabase
}