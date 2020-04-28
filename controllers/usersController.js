const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/users.js');



// functions to handle different requests for users related resources
const receiveRequest = (req, res, next) => {
    res.statusCode = 200;
    next();
};

const userSignUp = (req, res, next) => {

    // Check for existence of email in database
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            // user is an array
            if (user.length >= 1) {
                // 409 resource conflict
                return res.status(409).json({
                    message: 'This email has been registered.'
                });
            } else {
                // Hash password for security concern
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    // Return error if fails to hash password
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
                        user
                            .save()
                            .then(result => {
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
    // getAllUsers,
    // createAllUsers,
    // updateAllUsers,
    // deleteAllUsers,
    // getUserByID,
    // createUserByID,
    // updateUserByID,
    deleteUserById
}


