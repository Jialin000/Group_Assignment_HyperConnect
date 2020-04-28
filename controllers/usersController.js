const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/users.js');
const jwt = require('jsonwebtoken')


// functions to handle different requests for users related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};


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
                            password: hash
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
                        return res.status(200).json({
                            message: 'Authentication succeeded.',
                            token: token
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
            res.status(500).json({
                error: err
            });
        });
}

// Function to allow deletion of user, for DEVELOPMENT purpose
const deleteUserById = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
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




// Commented block for admin usage in further application
//
// const getAllUsers = (req, res, next) => {
//     res.send(users);
// };
//
// const createAllUsers = (req, res, next) => {
//     res.statusCode = 403;
//     res.send('POST method unsupported for this API end point');
// };
//
// const updateAllUsers = (req, res, next) => {
//     res.statusCode = 403;
//     res.send('PUT method unsupported for this API end point');
// };
//
// const deleteAllUsers = (req, res, next) => {
//     res.statusCode = 403;
//     res.send('DELETE method unsupported for this API end point');
// };
//
// const getUserByID = (req, res, next) => {
//     const user = users.find(user => user.id === req.params.id);
//
//     if (user) {
//         res.send(user);
//     } else {
//         res.statusCode = 500;
//         res.send([]);
//     }
// };
//
// const createUserByID = (req, res, next) => {
//     const user = req.body;
//
//     users.push(user);
//     res.send(users);
// };
//
// const updateUserByID = (req, res, next) => {
//     const new_user = req.body;
//     const user = users.find(user => user.id === req.params.id);
//
//     if (!user) {
//         res.statusCode = 500;
//         return res.send([]);
//     } else {
//         Object.assign(user, new_user);
//     }
//     res.send(user);
// };
//



module.exports = {
    receiveRequest,
    userSignUp,
    userLogIn,
    deleteUserById
}


