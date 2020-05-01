const mongoose = require("mongoose");

const baysSchema = new mongoose.Schema({
    bay_id: String,
    st_marker_id: String,
    status: String,
    location: Object,
    lat: String,
    lon: String
});



const Bays = mongoose.model("parkingBays", baysSchema,"parkingBays");

module.exports = Bays;