//require to the mongoose and load the pre-defined model
const mongoose = require("mongoose");
const fetch = require("node-fetch");

// functions to handle different requests for bays related resources
const receiveRequest = (req, res, next) => {
  res.statusCode = 200;
  next();
};

const updateDatabase = (req, res, next) => {
  const db = mongoose.connection;
  let url =
    "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?%24limit=5000&%24%24app_token=AdyvI0gKUddcE1r6gTOaarTiX";
  let settings = { method: "Get" };
  let bays = [];
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      for (let i_data = 0; i_data < json.length; i_data++) {
        const bay = {
          bay_id: json[i_data]["bay_id"],
          st_marker_id: json[i_data]["st_marker_id"],
          status: json[i_data]["status"],
          location: json[i_data]["location"],
          lat: json[i_data]["lat"],
          lon: json[i_data]["lon"],
          Description: "Restrictions information not available",
        };
        if (db.collection("parkingBays").find({ bay_id: bay["bay_id"] })) {
          db.collection("parkingBays").updateOne(
            { bay_id: bay["bay_id"] },
            {
              $set: {
                status: bay["status"],
              },
            }
          );
          bays.push(bay);
        } else {
          db.collection("parkingBays").updateOne(
            { bay_id: bay["bay_id"] },
            { $set: bay },
            { upsert: true }
          );
        }
      }
      return res.send(bays.length + " records from database have been updated");
    });
};

module.exports = {
  receiveRequest,
  updateDatabase,
};
