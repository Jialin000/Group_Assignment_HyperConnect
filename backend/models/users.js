const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
    },
    favorites: {
        type: [{
            tag: String,
            address: String,
            lat: Number,
            lng: Number
        }],
        default: []
    }
});




module.exports = mongoose.model('User', userSchema);