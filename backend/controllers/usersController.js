const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/users.js');
const jwt = require('jsonwebtoken')


// Function to handle userSignUp request
const userSignUp = (req, res, next) => {

    // Check for existence of email in database
    User.find({email: req.body.email})
        .exec()
        .then(user => {

            // If exists in database, registration fails
            if (user.length >= 1) {

                // 409 resource conflict
                return res.status(409).json({
                    message: 'This email has been registered.'
                });
            } else {

                // Hash password for security concern
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    // Return error if fails to hash
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        // Create user object using model
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            userName: req.body.userName,
                            email: req.body.email,
                            password: hash,
                            favorites: []
                        });

                        // Save created user object into mongodb
                        user
                            .save()
                            .then(result => {

                                // Response with 201 Resource created
                                res.status(201).json({
                                    message: `User: <${user.userName}> created.`
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
}

const userLogIn = (req, res, next) => {

    // Check for existence of account by email
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            //
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed.'
                });
            } else {

                // Verify password against stored password.
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Authentication failed.'
                        });
                    }

                    // If password matches
                    if (result) {

                        // Create token
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userName: user[0].userName,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );

                        // Return token with message
                        res.cookie("Authorization", token, {maxAge: 3600000});
                        return res.status(200).json({
                            message: 'Authentication succeeded.'
                        });

                    } else {
                        return res.status(401).json({
                            message: 'Authentication failed.'
                        });
                    }

                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });
}

// Function to log user out by removing the jwt stored in cookie
const userLogOut = (req, res, next) => {
    res.clearCookie("Authorization");
    return res.status(200).json({
        message : "Log out successfully"
    })
}



// Function to handle addition of new favorite parking bays
const addFavorites = (req, res, next) => {

    // Use user information extracted from jwt by middleware to update favorites
    User.findOneAndUpdate(
        {_id: req.userData.userId},
        {$push: {favorites: {tag: req.body.tag, lat: req.body.lat, lng: req.body.lng}}},
        {returnOriginal: false}
        )
        .exec()
        .then(user => {

            // If could not find user in database
            if (!user) {
                return res.status(500).json({
                    message: 'User Not Found'
                });
            } else {

                // If successfully find user and updated it, return the updated list of favorites
                res.status(201).json({
                    "message": 'Parking bay added to favorites',
                    "favorites": user.favorites
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: "Invalid Request"
            });
        });
}




// delete favorites
const deleteFavoriteById = (req, res, next) => {
    // Use user information extracted from jwt by middleware to update favorites
    User.findOneAndUpdate(
        {_id: req.userData.userId},
        {$pull: {favorites: {_id: req.params.id}}},
        {returnOriginal: false}
    )
        .exec()
        .then(user => {

            // If could not find user in database
            if (!user) {
                return res.status(500).json({
                    message: 'User Not Found'
                });
            } else {

                // If successfully find user and updated it, return the updated list of favorites
                res.status(200).json({
                    "message": 'Favorite location deleted',
                    "favorites": user.favorites
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: "Invalid Request"
            });
        });
}








// Function to get the list of favorite parking bays of a user
const getFavorites = (req, res, next) => {

    // Use user information extracted from jwt by middleware to update favorites
    User.findOne({_id: req.userData.userId})
        .exec()
        .then(user => {

            if (!user) {
                return res.status(500).json({
                    message: 'User Not Found'
                });
            } else {

                // user exists, returns the list of favorite parking bays
                res.status(200).json({
                    "favorites": user.favorites
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// Function to allow users to access their profile
const getUserById = (req, res, next) => {
    // Use user information extracted from jwt by middleware to update user infomation
    User.findOne({_id: req.userData.userId})
        .exec()
        .then(user => {

            if (!user) {
                return res.status(500).json({
                    message: 'User Not Found'
                });
            } else {

                // user exists, returns the list of favorite parking bays
                res.status(200)
                res.send(JSON.stringify({
                    "userName": user.userName,
                    "email": user.email,
                    "favorites": user.favorites
                }))
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

const updateUser = (req, res) => {
     // Use user information extracted from jwt by middleware to update favorites
    User.findOneAndUpdate(
        {_id: req.userData.userId},
        {$set: {userName: req.body.userName, email: req.body.email}},
        {returnOriginal: false}
        )
        .exec()
        .then(user => {

            // If could not find user in database
            if (!user) {
                return res.status(500).json({
                    message: 'User Not Found'
                });
            } else {

                // If successfully find user and updated it, return the updated list of favorites
                res.status(200).json({
                    "message": 'Update successful!',
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: "Invalid Request"
            });
        });
}



// Function to allow deletion of user, for DEVELOPMENT purpose
const deleteUserById = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(res => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


module.exports = {
    userSignUp,
    userLogIn,
    userLogOut,
    deleteUserById,
    addFavorites,
    deleteFavoriteById,
    getFavorites
    getUserById,
    updateUser
}


